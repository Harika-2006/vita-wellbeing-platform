
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  User, 
  Calendar, 
  Search, 
  MessageSquare, 
  Home,
  ArrowDown
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal
            <span className="text-blue-600 block">Health AI Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized medicine recommendations, diet plans, and expert consultations 
            powered by AI. Your health journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your health in one intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Search className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <CardTitle>Smart Medicine Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI-powered medicine suggestions based on your symptoms, age, and medical history. 
                  Get accurate dosage recommendations safely.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <Home className="h-6 w-6 text-green-600 group-hover:text-white" />
                </div>
                <CardTitle>Food Plate Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload photos of your meals for instant nutritional analysis and 
                  personalized dietary recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <MessageSquare className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>
                <CardTitle>AI Health Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  24/7 AI assistant for health questions, medicine information, 
                  and dietary guidance. Get instant answers anytime.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <Calendar className="h-6 w-6 text-orange-600 group-hover:text-white" />
                </div>
                <CardTitle>Doctor Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Book virtual appointments with certified doctors and nutritionists. 
                  Get professional medical advice from home.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Home className="h-6 w-6 text-red-600 group-hover:text-white" />
                </div>
                <CardTitle>Medicine Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Order medicines directly through our platform with real-time 
                  tracking and fast, reliable delivery.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <User className="h-6 w-6 text-indigo-600 group-hover:text-white" />
                </div>
                <CardTitle>Personal Health Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comprehensive health tracking with personalized recommendations 
                  based on your unique health profile and goals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust HealthAI for their medical and dietary needs
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold">HealthAI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering healthier lives through intelligent technology
          </p>
          <p className="text-sm text-gray-500">
            © 2025 HealthAI. All rights reserved. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
