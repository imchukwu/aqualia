import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, DollarSign, Users, Check, X, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';

const data = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 2100 },
    { name: 'Mar', total: 1800 },
    { name: 'Apr', total: 2400 },
    { name: 'May', total: 3200 },
    { name: 'Jun', total: 4500 },
];

interface PendingDistributor {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    distributor_profile: {
        business_name: string;
        registration_number: string;
        tax_id: string;
    };
}

interface RegisteredUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

const Dashboard = () => {
    const [pendingDistributors, setPendingDistributors] = useState<PendingDistributor[]>([]);
    const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
    const [isLoadingApps, setIsLoadingApps] = useState(true);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    const fetchPendingDistributors = async () => {
        setIsLoadingApps(true);
        try {
            const response = await api.get('/admin/distributors/pending');
            setPendingDistributors(response.data.data || []);
        } catch (error) {
            toast.error("Failed to load pending distributor applications");
        } finally {
            setIsLoadingApps(false);
        }
    };

    const fetchRegisteredUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const response = await api.get('/admin/users');
            setRegisteredUsers(response.data.data || []);
        } catch (error) {
            toast.error("Failed to load registered users");
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchPendingDistributors();
        fetchRegisteredUsers();
    }, []);

    const handleApproval = async (id: number, approved: boolean) => {
        try {
            const endpoint = approved ? `/admin/distributors/${id}/approve` : `/admin/distributors/${id}/reject`;
            await api.patch(endpoint);
            toast.success(`Distributor successfully ${approved ? 'approved' : 'rejected'}`);
            fetchPendingDistributors(); // Refresh list
        } catch (error: any) {
            toast.error(error.response?.data?.error || `Failed to ${approved ? 'approve' : 'reject'} distributor`);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your store's performance</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-soft hover:shadow-elevated transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦452,318.00</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-elevated transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-elevated transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Active in inventory</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-elevated transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Distributor Applications */}
            <Card className="shadow-soft border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        Pending Distributor Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoadingApps ? (
                        <p className="text-sm text-muted-foreground">Loading applications...</p>
                    ) : pendingDistributors.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <p>No pending distributor applications at this time.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingDistributors.map((dist) => (
                                <div key={dist.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors">
                                    <div className="space-y-1 mb-4 md:mb-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-foreground">{dist.distributor_profile?.business_name || dist.name}</h4>
                                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pending Review</span>
                                        </div>
                                        <div className="text-sm text-muted-foreground grid md:grid-cols-2 gap-x-8 gap-y-1">
                                            <p>Contact: {dist.name} ({dist.phone})</p>
                                            <p>Email: {dist.email}</p>
                                            <p>CAC: <span className="font-medium text-foreground">{dist.distributor_profile?.registration_number}</span></p>
                                            <p>TIN: <span className="font-medium text-foreground">{dist.distributor_profile?.tax_id || 'N/A'}</span></p>
                                        </div>
                                        <p className="text-xs text-muted-foreground pt-1">Applied: {new Date(dist.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200" onClick={() => handleApproval(dist.id, true)}>
                                            <Check className="w-4 h-4 mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => handleApproval(dist.id, false)}>
                                            <X className="w-4 h-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-soft">
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `₦${value}`}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#0ea5e9"
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 shadow-soft">
                    <CardHeader>
                        <CardTitle>Registered Users</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            System users and their roles.
                        </p>
                    </CardHeader>
                    <CardContent>
                        {isLoadingUsers ? (
                            <p className="text-sm text-muted-foreground">Loading users...</p>
                        ) : registeredUsers.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No users found.</p>
                        ) : (
                            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
                                {registeredUsers.map((user) => (
                                    <div key={user.id} className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                            {user.name.substring(0, 2)}
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="font-medium text-xs bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-full inline-block">
                                                {user.role}
                                            </div>
                                            <div className="text-[10px] text-muted-foreground mt-1 capitalize">
                                                {user.status.toLowerCase()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
