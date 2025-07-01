
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Search, ShoppingCart, Plus, Minus, MapPin, Clock } from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  category: string;
  prescription: boolean;
}

interface CartItem extends Medicine {
  quantity: number;
}

const MedicineDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Acetaminophen 500mg",
      description: "Pain reliever and fever reducer",
      price: 8.99,
      inStock: true,
      category: "pain-relief",
      prescription: false
    },
    {
      id: "2",
      name: "Ibuprofen 200mg",
      description: "Anti-inflammatory pain reliever",
      price: 12.50,
      inStock: true,
      category: "pain-relief",
      prescription: false
    },
    {
      id: "3",
      name: "Vitamin D3 1000 IU",
      description: "Bone health supplement",
      price: 15.99,
      inStock: true,
      category: "vitamins",
      prescription: false
    },
    {
      id: "4",
      name: "Omega-3 Fish Oil",
      description: "Heart health supplement",
      price: 24.99,
      inStock: true,
      category: "vitamins",
      prescription: false
    },
    {
      id: "5",
      name: "Antibiotics (Generic)",
      description: "Bacterial infection treatment",
      price: 35.00,
      inStock: true,
      category: "prescription",
      prescription: true
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "pain-relief", name: "Pain Relief" },
    { id: "vitamins", name: "Vitamins & Supplements" },
    { id: "prescription", name: "Prescription" }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === medicine.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some medicines to your cart first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: "Your medicines will be delivered within 2-4 hours.",
    });

    // Reset cart
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medicine Delivery
          </h1>
          <p className="text-gray-600">
            Order medicines online with fast, reliable delivery to your doorstep
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters & Search */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Delivery Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Free delivery on orders $25+</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>2-4 hours delivery time</span>
                </div>
                <div className="text-xs text-gray-500">
                  Prescription medicines require valid prescription upload
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMedicines.map(medicine => (
                <Card key={medicine.id} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{medicine.name}</CardTitle>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg font-bold text-green-600">
                          ${medicine.price}
                        </span>
                        {medicine.prescription && (
                          <Badge variant="outline" className="text-xs">
                            Prescription Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {medicine.description}
                    </CardDescription>
                    
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant={medicine.inStock ? "secondary" : "destructive"}
                        className={medicine.inStock ? "bg-green-100 text-green-800" : ""}
                      >
                        {medicine.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      
                      <Button
                        onClick={() => addToCart(medicine)}
                        disabled={!medicine.inStock}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredMedicines.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No medicines found matching your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-lg">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Place Order
                      </Button>
                      
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Prescription upload required for Rx items
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDelivery;
