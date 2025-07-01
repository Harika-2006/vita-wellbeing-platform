
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { User, Calendar, Activity, Settings } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    age: "32",
    weight: "75",
    height: "175",
    medicalHistory: "No significant medical history",
    allergies: "None",
    emergencyContact: "+1 (555) 123-4567"
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement profile update with Supabase
      console.log("Saving profile:", profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const healthMetrics = [
    { label: "BMI", value: "24.5", status: "Normal", color: "text-green-600" },
    { label: "Blood Pressure", value: "120/80", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "75 kg", status: "Stable", color: "text-blue-600" }
  ];

  const recentActivity = [
    { type: "Medicine Search", description: "Searched for headache remedies", date: "2 hours ago" },
    { type: "Food Analysis", description: "Analyzed breakfast plate", date: "1 day ago" },
    { type: "Chat", description: "Asked about vitamin D dosage", date: "2 days ago" },
    { type: "Consultation", description: "Video call with Dr. Sarah Johnson", date: "5 days ago" }
  ];

  const appointments = [
    { doctor: "Dr. Sarah Johnson", specialty: "General Medicine", date: "Tomorrow, 2:00 PM", status: "Confirmed" },
    { doctor: "Dr. Michael Chen", specialty: "Cardiology", date: "Next Week", status: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your health information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{profileData.fullName}</CardTitle>
                <CardDescription>{profileData.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span>{profileData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span>{profileData.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span>{profileData.height} cm</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Health
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and medical information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={profileData.age}
                          onChange={(e) => handleInputChange("age", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={profileData.weight}
                          onChange={(e) => handleInputChange("weight", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={profileData.height}
                          onChange={(e) => handleInputChange("height", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          value={profileData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        rows={3}
                        value={profileData.medicalHistory}
                        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        rows={2}
                        value={profileData.allergies}
                        onChange={(e) => handleInputChange("allergies", e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Tab */}
              <TabsContent value="health">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                    <CardDescription>
                      Overview of your current health indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {healthMetrics.map((metric, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{metric.label}</h4>
                              <p className="text-2xl font-bold mt-1">{metric.value}</p>
                            </div>
                            <div className={`text-sm font-medium ${metric.color}`}>
                              {metric.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>
                      Upcoming and past medical consultations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.map((appointment, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{appointment.doctor}</h4>
                              <p className="text-sm text-gray-600">{appointment.specialty}</p>
                              <p className="text-sm text-blue-600 mt-1">{appointment.date}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              appointment.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent interactions with HealthAI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{activity.type}</p>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                              </div>
                              <span className="text-xs text-gray-500">{activity.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
