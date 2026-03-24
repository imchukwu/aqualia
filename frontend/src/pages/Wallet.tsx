import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Receipt, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import api from '@/lib/api';
import { toast } from 'sonner';
import useAuthStore from '@/store/authStore';
import { Navigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';

interface Transaction {
    id: number;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    reference: string;
    description: string;
    created_at: string;
}

const Wallet = () => {
    const { user } = useAuthStore();
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Funding State
    const [fundAmount, setFundAmount] = useState('');
    const [isFunding, setIsFunding] = useState(false);

    const fetchWalletData = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/wallet/');
            setBalance(response.data.data.balance);
            setTransactions(response.data.data.transactions || []);
        } catch (error) {
            toast.error("Failed to load wallet data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'DISTRIBUTOR') {
            fetchWalletData();
        }
    }, [user]);

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email || 'customer@aqualia.com',
        amount: parseFloat(fundAmount) * 100 || 0, // Paystack expects amount in kobo
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = async (reference: any) => {
        try {
            await api.post('/wallet/fund/verify', {
                reference: reference.reference,
                amount: parseFloat(fundAmount)
            });
            toast.success(`Successfully funded wallet with ₦${parseFloat(fundAmount).toLocaleString()}`);
            setFundAmount('');
            fetchWalletData(); // Refresh UI
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Funding verification failed.");
        } finally {
            setIsFunding(false);
        }
    };

    const onClose = () => {
        toast.error('Payment cancelled');
        setIsFunding(false);
    };

    const handleFundWallet = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(fundAmount);
        if (isNaN(amount) || amount < 1000) {
            toast.error("Minimum funding amount is ₦1,000");
            return;
        }

        setIsFunding(true);
        initializePayment({
            onSuccess,
            onClose
        });
    };

    if (!user || user.role !== 'DISTRIBUTOR') {
        return <Navigate to="/auth" />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 py-8 md:py-12 bg-muted/30">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Digital Wallet</h1>
                        <p className="text-muted-foreground mt-1">Manage your funds and view transaction history</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Balance Overview Card */}
                        <div className="md:col-span-1 space-y-6">
                            <Card className="shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center text-primary gap-2 text-lg">
                                        <WalletIcon className="w-5 h-5" />
                                        Available Balance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <div className="h-10 w-32 bg-muted rounded animate-pulse mb-6"></div>
                                    ) : (
                                        <div className="text-4xl font-bold text-foreground mb-6">
                                            ₦{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    )}

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full shadow-md" size="lg">Fund Wallet</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Add Funds</DialogTitle>
                                                <DialogDescription>
                                                    Enter the amount you wish to add to your Aqualia wallet.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleFundWallet} className="space-y-4 pt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="amount">Amount (₦)</Label>
                                                    <Input
                                                        id="amount"
                                                        type="number"
                                                        min="1000"
                                                        step="100"
                                                        placeholder="Enter amount (min ₦1,000)"
                                                        value={fundAmount}
                                                        onChange={(e) => setFundAmount(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full" disabled={isFunding}>
                                                    {isFunding ? 'Processing...' : 'Proceed to Payment (Paystack)'}
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>

                            <Card className="shadow-soft bg-card">
                                <CardHeader>
                                    <CardTitle className="text-lg">Need Help?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-4">
                                    <p>Wallet funds can be used immediately for any wholesale purchase at checkout.</p>
                                    <p>If you made a transfer and it hasn't reflected, please wait 5 minutes or contact support with your reference number.</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Transaction Ledger */}
                        <div className="md:col-span-2">
                            <Card className="shadow-soft h-full">
                                <CardHeader className="border-b border-border/50 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Receipt className="w-5 h-5 text-primary" />
                                        <CardTitle className="text-xl">Transaction History</CardTitle>
                                    </div>
                                    <CardDescription>A complete ledger of your top-ups and purchases</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {isLoading ? (
                                        <div className="p-8 text-center text-muted-foreground">Loading ledger...</div>
                                    ) : transactions.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-12 text-center">
                                            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                                <Clock className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <h3 className="text-lg font-medium text-foreground mb-1">No Transactions Yet</h3>
                                            <p className="text-muted-foreground text-sm max-w-sm">
                                                Your wallet is empty. Fund your wallet to see your transaction history appear here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-border">
                                            {transactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((txn) => (
                                                <div key={txn.id} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors flex items-center justify-between">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`mt-0.5 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${txn.type === 'CREDIT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {txn.type === 'CREDIT' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground">{txn.description}</p>
                                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                                <span>{new Date(txn.created_at).toLocaleString()}</span>
                                                                <span>•</span>
                                                                <span className="font-mono text-[10px] break-all">Ref: {txn.reference}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`font-bold whitespace-nowrap ml-4 ${txn.type === 'CREDIT' ? 'text-green-600' : 'text-foreground'}`}>
                                                        {txn.type === 'CREDIT' ? '+' : '-'}₦{Math.abs(txn.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Wallet;
