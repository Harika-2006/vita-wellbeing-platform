
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Upload, Camera, AlertTriangle, CheckCircle } from "lucide-react";

const FoodAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null); // Reset previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual computer vision API call
      console.log("Analyzing food image...");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockAnalysis = {
        detectedFoods: [
          { name: "Grilled Chicken Breast", confidence: 0.92, calories: 185, protein: 35, carbs: 0, fat: 4 },
          { name: "Brown Rice", confidence: 0.88, calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
          { name: "Steamed Broccoli", confidence: 0.95, calories: 25, protein: 3, carbs: 5, fat: 0.3 },
          { name: "Olive Oil", confidence: 0.78, calories: 40, protein: 0, carbs: 0, fat: 4.5 }
        ],
        totalNutrition: {
          calories: 362,
          protein: 40.6,
          carbs: 28,
          fat: 9.7,
          fiber: 4.2,
          sugar: 2.1
        },
        healthScore: 85,
        recommendations: [
          "Great protein content for muscle maintenance",
          "Good balance of macronutrients",
          "Consider adding more colorful vegetables for additional vitamins"
        ],
        warnings: [
          "Portion size appears moderate - ensure it meets your caloric needs"
        ]
      };

      setAnalysis(mockAnalysis);
      toast({
        title: "Analysis complete!",
        description: "Your food has been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Food Plate Analysis
          </h1>
          <p className="text-gray-600">
            Upload a photo of your meal to get detailed nutritional analysis and recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Food Image
              </CardTitle>
              <CardDescription>
                Take a photo or upload an image of your meal for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!selectedImage ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload an image</p>
                    <p className="text-sm text-gray-400">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Food to analyze" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={triggerFileInput}
                        variant="outline"
                        className="flex-1"
                      >
                        Change Image
                      </Button>
                      <Button 
                        onClick={analyzeImage}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {loading ? "Analyzing..." : "Analyze Food"}
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Tips for better analysis:</strong>
                      <ul className="list-disc list-inside mt-1">
                        <li>Ensure good lighting</li>
                        <li>Capture the entire plate/meal</li>
                        <li>Avoid shadows and reflections</li>
                        <li>Take photo from above when possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis && (
              <>
                {/* Health Score */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-green-700">Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{analysis.healthScore}</div>
                            <div className="text-sm text-gray-600">out of 100</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detected Foods */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Detected Foods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.detectedFoods.map((food: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{food.name}</h4>
                            <Badge variant="secondary">
                              {Math.round(food.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                            <div>{food.calories} cal</div>
                            <div>{food.protein}g protein</div>
                            <div>{food.carbs}g carbs</div>
                            <div>{food.fat}g fat</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrition Summary */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Nutrition Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{analysis.totalNutrition.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{analysis.totalNutrition.protein}g</div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{analysis.totalNutrition.carbs}g</div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{analysis.totalNutrition.fat}g</div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{analysis.totalNutrition.fiber}g</div>
                        <div className="text-sm text-gray-600">Fiber</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{analysis.totalNutrition.sugar}g</div>
                        <div className="text-sm text-gray-600">Sugar</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Positive Aspects
                        </h4>
                        <ul className="space-y-1">
                          {analysis.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {analysis.warnings.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Considerations
                          </h4>
                          <ul className="space-y-1">
                            {analysis.warnings.map((warning: string, index: number) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!analysis && !selectedImage && (
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-gray-500">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Upload a food image to get started</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysis;
