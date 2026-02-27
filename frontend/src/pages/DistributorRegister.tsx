import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building2, Droplets, Mail, Phone, FileText, User } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

const DistributorRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Distributor Registration State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [businessName, setBusinessName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [taxId, setTaxId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                phone,
                password,
                role: 'DISTRIBUTOR',
                business_name: businessName,
                registration_number: registrationNumber,
                tax_id: taxId
            });

            toast.success(response.data.message || 'Distributor application submitted successfully!');
            toast.info('Your account is pending admin approval. We will contact you shortly.');
            navigate('/auth'); // Redirect to login page
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to submit application');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-8 md:py-16 gradient-water bubble-pattern">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto">
                        <Link
                            to="/auth"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>

                        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-ocean flex items-center justify-center shadow-soft">
                                    <Building2 className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <h1 className="text-2xl font-bold text-foreground">Distributor Application</h1>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Partner with Aqualia as a business distributor for wholesale pricing and bulk orders.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Business Information Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium border-b pb-2">Business Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="businessName">Business Name <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="businessName" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="XYZ Enterprises Ltd" className="pl-10" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="registrationNumber">Registration Number (CAC) <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="registrationNumber" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} placeholder="RC-123456" className="pl-10" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="taxId">Tax Identification Number (TIN) <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="taxId" value={taxId} onChange={e => setTaxId(e.target.value)} placeholder="00000000-0000" className="pl-10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Primary Contact Section */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-lg font-medium border-b pb-2">Primary Contact</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="contactName">Full Name <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="contactName" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="pl-10" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@xyz.com" className="pl-10" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 xxx xxx xxxx" className="pl-10" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Section */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-lg font-medium border-b pb-2">Security</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                                            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full gradient-ocean text-primary-foreground py-6 text-lg" disabled={isLoading}>
                                        {isLoading ? 'Submitting Application...' : 'Submit Distributor Application'}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        By submitting this form, you agree to Aqualia's B2B Terms of Service and Privacy Policy. All applications are subject to review and approval.
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DistributorRegister;
