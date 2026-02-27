import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Phone, ArrowLeft, Droplets } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginFn = useAuthStore(state => state.login);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      toast.success(response.data.message || 'Logged in successfully!');
      loginFn(response.data.user, response.data.token);

      if (response.data.user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (response.data.user.role === 'DISTRIBUTOR') navigate('/distributor/dashboard');
      else navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: 'RETAIL'
      });
      toast.success(response.data.message || 'Account created successfully!');
      // Registration doesn't strictly log them in, they might need to login. Or we auto switch to login tab.
      toast.info('Please log in with your new credentials');

    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-16 gradient-water bubble-pattern">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-ocean flex items-center justify-center shadow-soft">
                  <Droplets className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welcome to Aqualia</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Retail Customer Access
                </p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="pl-10" required />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gradient-ocean text-primary-foreground" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="fullName" value={regName} onChange={e => setRegName(e.target.value)} type="text" placeholder="Enter your full name" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="registerEmail" value={regEmail} onChange={e => setRegEmail(e.target.value)} type="email" placeholder="Enter your email" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="phone" value={regPhone} onChange={e => setRegPhone(e.target.value)} type="tel" placeholder="Enter your phone number" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="registerPassword" value={regPassword} onChange={e => setRegPassword(e.target.value)} type="password" placeholder="Create a password" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input id="confirmPassword" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} type="password" placeholder="Confirm your password" className="pl-10" required />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gradient-ocean text-primary-foreground" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Retail Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">Are you a business?</p>
                <Link to="/distributor/register" className="text-primary font-medium hover:underline">Apply for a Distributor Account</Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
