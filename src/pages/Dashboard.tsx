
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Search, 
  MessageSquare, 
  Calendar, 
  Home,
  User,
  ArrowUp
} from "lucide-react";

const Dashboard = () => {
  const quickActions = [
    {
      title: "Medicine Recommendation",
      description: "Get AI-powered medicine suggestions",
      icon: Search,
      link: "/medicine-recommendation",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Food Analysis",
      description: "Upload and analyze your meal photos",
      icon: Home,
      link: "/food-analysis",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "AI Assistant",
      description: "Chat with our health AI assistant",
      icon: MessageSquare,
      link: "/chatbot",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Book Consultation",
      description: "Schedule with doctors & nutritionists",
      icon: Calendar,
      link: "/doctor-consultation",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const recentActivity = [
    { type: "Medicine", activity: "Searched for headache remedies", time: "2 hours ago" },
    { type: "Food", activity: "Analyzed breakfast plate", time: "1 day ago" },
    { type: "Chat", activity: "Asked about vitamin D dosage", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's your health dashboard overview
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Health Stats */}
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Health Overview</CardTitle>
              <CardDescription>Your health metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Medicine Searches</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Food Analyses</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24</div>
                  <div className="text-sm text-gray-600">Chat Messages</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Consultations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest health interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
              <Link to="/profile">
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No upcoming appointments</p>
              <Link to="/doctor-consultation">
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
