import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Pricing {
    retail_price: number;
    wholesale_price: number;
    tier_1_price: number;
    tier_2_price: number;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    category_id: number;
    sku: string;
    base_unit: string;
    stock_quantity: number;
    status: string;
    pricing: Pricing;
}

const AdminProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        sku: '',
        category_id: '',
        description: '',
        base_unit: 'Bag',
        unit_multiplier: 1,
        stock_quantity: 0,
        low_stock_threshold: 10,
        retail_price: 0,
        wholesale_price: 0,
        tier_1_price: 0,
        tier_2_price: 0,
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/products'),
                api.get('/products/categories')
            ]);
            setProducts(productsRes.data.data || []);
            setCategories(categoriesRes.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        toast.info('Delete functionality coming soon');
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newProduct.category_id) {
            toast.error("Please select a category");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...newProduct,
                category_id: parseInt(newProduct.category_id, 10),
                unit_multiplier: parseInt(newProduct.unit_multiplier.toString(), 10),
                stock_quantity: parseInt(newProduct.stock_quantity.toString(), 10),
                low_stock_threshold: parseInt(newProduct.low_stock_threshold.toString(), 10),
                retail_price: parseFloat(newProduct.retail_price.toString()),
                wholesale_price: parseFloat(newProduct.wholesale_price.toString()),
                tier_1_price: parseFloat(newProduct.tier_1_price.toString()),
                tier_2_price: parseFloat(newProduct.tier_2_price.toString())
            };
            await api.post('/admin/products', payload);
            toast.success("Product created successfully!");
            setIsAddDialogOpen(false);
            // Reset form
            setNewProduct({
                name: '', sku: '', category_id: '', description: '', base_unit: 'Bag',
                unit_multiplier: 1, stock_quantity: 0, low_stock_threshold: 10,
                retail_price: 0, wholesale_price: 0, tier_1_price: 0, tier_2_price: 0,
            });
            fetchData();
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to create product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your product inventory</p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gradient-ocean text-primary-foreground">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>
                                Create a new product and set pricing tiers for different roles.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <ScrollArea className="h-[60vh] pr-4">
                                <div className="space-y-4 p-1">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Product Name</Label>
                                            <Input required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="e.g. Premium Sachet Water" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>SKU</Label>
                                            <Input required value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} placeholder="e.g. AQ-SACHET-B1" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select required value={newProduct.category_id} onValueChange={(val) => setNewProduct({ ...newProduct, category_id: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Base Unit</Label>
                                            <Select required value={newProduct.base_unit} onValueChange={(val) => setNewProduct({ ...newProduct, base_unit: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bag">Bag (Sachets)</SelectItem>
                                                    <SelectItem value="Pack">Pack (Bottles)</SelectItem>
                                                    <SelectItem value="Unit">Single Unit</SelectItem>
                                                    <SelectItem value="Carton">Carton</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description..." />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Initial Stock</Label>
                                            <Input required type="number" min="0" value={newProduct.stock_quantity} onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) || 0 })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Low Stock Alert</Label>
                                            <Input required type="number" min="0" value={newProduct.low_stock_threshold} onChange={(e) => setNewProduct({ ...newProduct, low_stock_threshold: parseInt(e.target.value) || 0 })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Unit Multiplier</Label>
                                            <Input required type="number" min="1" value={newProduct.unit_multiplier} onChange={(e) => setNewProduct({ ...newProduct, unit_multiplier: parseInt(e.target.value) || 1 })} />
                                        </div>
                                    </div>

                                    <div className="border-t pt-4 mt-4">
                                        <h3 className="font-semibold mb-3">Pricing Tiers (₦)</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Retail Price</Label>
                                                <Input required type="number" min="0" step="50" value={newProduct.retail_price} onChange={(e) => setNewProduct({ ...newProduct, retail_price: parseFloat(e.target.value) || 0 })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Wholesale Price (Standard Distributor)</Label>
                                                <Input required type="number" min="0" step="50" value={newProduct.wholesale_price} onChange={(e) => setNewProduct({ ...newProduct, wholesale_price: parseFloat(e.target.value) || 0 })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tier 1 Price</Label>
                                                <Input required type="number" min="0" step="50" value={newProduct.tier_1_price} onChange={(e) => setNewProduct({ ...newProduct, tier_1_price: parseFloat(e.target.value) || 0 })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tier 2 Price</Label>
                                                <Input required type="number" min="0" step="50" value={newProduct.tier_2_price} onChange={(e) => setNewProduct({ ...newProduct, tier_2_price: parseFloat(e.target.value) || 0 })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="flex justify-end pt-4 border-t">
                                <Button type="button" variant="outline" className="mr-2" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Product'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-lg bg-card shadow-sm overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Retail Price</TableHead>
                            <TableHead>Wholesale Price</TableHead>
                            <TableHead>Base Unit</TableHead>
                            <TableHead>Stock (Units)</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>₦{product.pricing?.retail_price.toLocaleString()}</TableCell>
                                    <TableCell>₦{product.pricing?.wholesale_price.toLocaleString()}</TableCell>
                                    <TableCell>{product.base_unit}</TableCell>
                                    <TableCell>{product.stock_quantity}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:text-red-600"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminProducts;
