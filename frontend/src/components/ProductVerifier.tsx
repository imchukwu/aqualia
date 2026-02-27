import { useState } from 'react';
import { QrCode, Search, CheckCircle, XCircle, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface VerificationResult {
  isValid: boolean;
  productName?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  distributor?: string;
}

const ProductVerifier = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!serialNumber.trim()) {
      toast.error('Please enter a serial number');
      return;
    }

    setIsVerifying(true);
    setResult(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock verification - in real app, this would call backend
    const isValid = serialNumber.toLowerCase().startsWith('aq');
    
    if (isValid) {
      setResult({
        isValid: true,
        productName: 'Aqualia Table Water 50cl',
        batchNumber: 'BTH-2026-001',
        manufacturingDate: '2026-01-15',
        expiryDate: '2027-01-15',
        distributor: 'Aqualia Waters Ltd.',
      });
      toast.success('Product verified successfully!');
    } else {
      setResult({
        isValid: false,
      });
      toast.error('Product verification failed');
    }

    setIsVerifying(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-ocean flex items-center justify-center shadow-elevated">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Verify Your Product
        </h1>
        <p className="text-muted-foreground">
          Ensure you're drinking genuine Aqualia water. Enter the serial number 
          found on your product or scan the QR code.
        </p>
      </div>

      {/* Verification Form */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter serial number (e.g., AQ-2026-XXXXX)"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="h-12 text-lg"
            />
          </div>
          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="h-12 px-8 gradient-ocean text-primary-foreground"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Verify
              </>
            )}
          </Button>
        </div>

        {/* QR Scanner Option */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Or scan QR code</p>
          <Button variant="outline" className="gap-2">
            <QrCode className="w-5 h-5" />
            Open Scanner
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div
          className={`rounded-2xl p-6 md:p-8 animate-scale-in ${
            result.isValid
              ? 'bg-green-50 border-2 border-green-200'
              : 'bg-red-50 border-2 border-red-200'
          }`}
        >
          <div className="flex items-start gap-4">
            {result.isValid ? (
              <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3
                className={`text-xl font-bold mb-2 ${
                  result.isValid ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {result.isValid ? 'Authentic Product' : 'Verification Failed'}
              </h3>
              {result.isValid ? (
                <div className="space-y-3">
                  <p className="text-green-700">
                    This product has been verified as genuine Aqualia water.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-xs text-green-600 uppercase tracking-wider">Product</p>
                      <p className="font-medium text-green-800">{result.productName}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-xs text-green-600 uppercase tracking-wider">Batch No.</p>
                      <p className="font-medium text-green-800">{result.batchNumber}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-xs text-green-600 uppercase tracking-wider">Mfg Date</p>
                      <p className="font-medium text-green-800">{result.manufacturingDate}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-xs text-green-600 uppercase tracking-wider">Expiry Date</p>
                      <p className="font-medium text-green-800">{result.expiryDate}</p>
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-green-600 uppercase tracking-wider">Distributor</p>
                    <p className="font-medium text-green-800">{result.distributor}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-red-700 mb-4">
                    We could not verify this product. This may be a counterfeit product.
                  </p>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• Please check the serial number and try again</li>
                    <li>• If the problem persists, contact our support team</li>
                    <li>• Do not consume unverified products</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVerifier;
