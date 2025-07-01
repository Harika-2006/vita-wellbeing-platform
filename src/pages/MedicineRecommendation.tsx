
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Search, AlertTriangle, Clock, Info } from "lucide-react";

const MedicineRecommendation = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual ML model API call
      console.log("Getting recommendations for:", { symptoms, age, medicalHistory });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      const mockRecommendations = {
        medicines: [
          {
            name: "Acetaminophen (Tylenol)",
            dosage: "500mg every 6 hours",
            duration: "3-5 days",
            purpose: "Pain relief and fever reduction",
            warnings: ["Do not exceed 3000mg per day", "Avoid alcohol"]
          },
          {
            name: "Ibuprofen (Advil)",
            dosage: "200mg every 8 hours",
            duration: "3-5 days",
            purpose: "Anti-inflammatory and pain relief",
            warnings: ["Take with food", "Not suitable if allergic to NSAIDs"]
          }
        ],
        dietPlan: {
          recommendations: [
            "Increase fluid intake (water, herbal teas)",
            "Consume vitamin C rich foods (citrus fruits, berries)",
            "Add ginger and turmeric to meals for anti-inflammatory effects",
            "Light, easily digestible meals"
          ],
          avoid: [
            "Processed and sugary foods",
            "Excessive caffeine",
            "Alcohol",
            "Heavy, greasy meals"
          ]
        },
        disclaimer: "This is AI-generated guidance. Always consult with a healthcare professional before taking any medication."
      };

      setRecommendations(mockRecommendations);
      toast({
        title: "Recommendations generated!",
        description: "Please review the suggestions below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medicine Recommendation
          </h1>
          <p className="text-gray-600">
            Get AI-powered medicine and diet suggestions based on your symptoms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Symptom Analysis
              </CardTitle>
              <CardDescription>
                Provide details about your symptoms for personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Current Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms in detail (e.g., headache, fever, nausea...)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="1"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                  <Textarea
                    id="medicalHistory"
                    placeholder="Any relevant medical conditions, allergies, or current medications..."
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Get Recommendations"}
                </Button>
              </form>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Important:</strong> This AI tool provides general guidance only. 
                    Always consult a healthcare professional for proper medical diagnosis and treatment.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-6">
            {recommendations && (
              <>
                {/* Medicine Recommendations */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-green-700">Medicine Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.medicines.map((medicine: any, index: number) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{medicine.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span><strong>Dosage:</strong> {medicine.dosage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-green-500" />
                            <span><strong>Purpose:</strong> {medicine.purpose}</span>
                          </div>
                          <div>
                            <strong>Duration:</strong> {medicine.duration}
                          </div>
                          <div>
                            <strong>Warnings:</strong>
                            <ul className="list-disc list-inside mt-1 text-red-600">
                              {medicine.warnings.map((warning: string, idx: number) => (
                                <li key={idx}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Diet Recommendations */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-green-700">Diet Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Recommended Foods:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendations.dietPlan.recommendations.map((item: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Foods to Avoid:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendations.dietPlan.avoid.map((item: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="border-0 shadow-md bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        {recommendations.disclaimer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!recommendations && (
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Enter your symptoms to get personalized recommendations</p>
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

export default MedicineRecommendation;
