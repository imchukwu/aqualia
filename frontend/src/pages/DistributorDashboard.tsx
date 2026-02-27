import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Clock, CreditCard, Wallet, Plus } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { toast } from 'sonner';

const DistributorDashboard = () => {
    const { user } = useAuthStore();
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [isLoadingWallet, setIsLoadingWallet] = useState(true);

    useEffect(() => {
        if (user && user.role === 'DISTRIBUTOR') {
            const fetchWallet = async () => {
                try {
                    const response = await api.get('/wallet/');
                    setWalletBalance(response.data.data.balance);
                } catch (error) {
                    toast.error("Failed to load wallet balance");
                } finally {
                    setIsLoadingWallet(false);
                }
            };
            fetchWallet();
        }
    }, [user]);

    if (!user || user.role !== 'DISTRIBUTOR') {
        return <Navigate to="/auth" />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 py-8 md:py-12 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, {user.name}</h1>
                        <p className="text-muted-foreground mt-1">Distributor Dashboard - Manage your wholesale orders</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card className="shadow-soft border-0 bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2</div>
                                <p className="text-xs text-muted-foreground">Awaiting processing</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-soft border-0 bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                                <Truck className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-muted-foreground">Arriving soon</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-soft border-0 bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">15</div>
                                <p className="text-xs text-muted-foreground">Lifetime successful orders</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-soft border-0 bg-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Digital Wallet</CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {isLoadingWallet ? (
                                    <div className="text-2xl font-bold text-muted-foreground animate-pulse">₦---</div>
                                ) : (
                                    <div className="text-2xl font-bold">₦{walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                )}
                                <p className="text-xs text-muted-foreground">Available balance</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Card className="shadow-soft border-0 bg-card h-full">
                                <CardHeader>
                                    <CardTitle>Recent Orders Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm mb-4">View and track all your recent wholesale purchases.</p>
                                    <Link to="/track-order" className="text-primary hover:underline font-medium text-sm flex items-center">
                                        Go to Order History <Truck className="w-4 h-4 ml-1" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-1">
                            <Card className="shadow-soft border-0 bg-card h-full">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Link to="/products" className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Package className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm text-foreground">Browse Catalog</h4>
                                            <p className="text-xs text-muted-foreground">Place a new wholesale order</p>
                                        </div>
                                    </Link>
                                    <Link to="/track-order" className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Truck className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm text-foreground">Track Shipments</h4>
                                            <p className="text-xs text-muted-foreground">View current delivery status</p>
                                        </div>
                                    </Link>
                                    <Link to="/wallet" className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Wallet className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm text-foreground">Fund Wallet</h4>
                                            <p className="text-xs text-muted-foreground">Add funds via Paystack</p>
                                        </div>
                                    </Link>
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

export default DistributorDashboard;
