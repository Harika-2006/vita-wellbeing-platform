
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Calendar, Clock, Star, User, Video, MessageSquare } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: number;
  price: number;
  available: boolean;
  image?: string;
  nextSlot: string;
}

const DoctorConsultation = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const specialties = [
    { id: "all", name: "All Specialties" },
    { id: "general", name: "General Medicine" },
    { id: "cardiology", name: "Cardiology" },
    { id: "dermatology", name: "Dermatology" },
    { id: "nutrition", name: "Nutrition" },
    { id: "psychiatry", name: "Psychiatry" }
  ];

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "General Medicine",
      rating: 4.8,
      experience: 12,
      price: 49,
      available: true,
      nextSlot: "Today, 2:00 PM"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Cardiology",
      rating: 4.9,
      experience: 15,
      price: 75,
      available: true,
      nextSlot: "Tomorrow, 10:00 AM"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Dermatology",
      rating: 4.7,
      experience: 8,
      price: 60,
      available: true,
      nextSlot: "Today, 4:30 PM"
    },
    {
      id: "4",
      name: "Dr. Lisa Thompson",
      specialization: "Nutrition",
      rating: 4.6,
      experience: 10,
      price: 40,
      available: true,
      nextSlot: "Tomorrow, 1:00 PM"
    },
    {
      id: "5",
      name: "Dr. James Wilson",
      specialization: "Psychiatry",
      rating: 4.8,
      experience: 18,
      price: 85,
      available: false,
      nextSlot: "Next Week"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    if (selectedSpecialty === "all") return true;
    return doctor.specialization.toLowerCase().includes(selectedSpecialty);
  });

  const handleBookAppointment = (doctor: Doctor) => {
    if (!doctor.available) {
      toast({
        title: "Doctor not available",
        description: "Please select another doctor or check availability later.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual booking logic with Supabase
    toast({
      title: "Appointment booked!",
      description: `Your consultation with ${doctor.name} is scheduled for ${doctor.nextSlot}.`,
    });
  };

  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "Today, 2:00 PM",
      type: "Video Call",
      status: "Confirmed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Doctor Consultations
          </h1>
          <p className="text-gray-600">
            Book virtual appointments with certified healthcare professionals
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {specialties.map(specialty => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSpecialty === specialty.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {specialty.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingAppointments.map(appointment => (
                      <div key={appointment.id} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm">{appointment.doctorName}</h4>
                        <p className="text-xs text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-blue-600">{appointment.date}</span>
                        </div>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Doctors List */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDoctors.map(doctor => (
                <Card key={doctor.id} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription className="text-blue-600">
                          {doctor.specialization}
                        </CardDescription>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {doctor.experience} years exp.
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Consultation Fee:</span>
                        <span className="text-lg font-bold text-green-600">
                          ${doctor.price}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Available:</span>
                        <Badge 
                          variant={doctor.available ? "secondary" : "destructive"}
                          className={doctor.available ? "bg-green-100 text-green-800" : ""}
                        >
                          {doctor.nextSlot}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleBookAppointment(doctor)}
                          disabled={!doctor.available}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Book Video Call
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3"
                          onClick={() => {
                            toast({
                              title: "Message sent",
                              description: `Your message has been sent to ${doctor.name}.`,
                            });
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredDoctors.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No doctors found for the selected specialty</p>
                </div>
              )}
            </div>

            {/* How it Works */}
            <Card className="mt-8 border-0 shadow-md">
              <CardHeader>
                <CardTitle>How Video Consultations Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium mb-2">1. Book Appointment</h4>
                    <p className="text-sm text-gray-600">
                      Choose your preferred doctor and time slot
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Video className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium mb-2">2. Join Video Call</h4>
                    <p className="text-sm text-gray-600">
                      Connect via secure video call at your scheduled time
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium mb-2">3. Get Treatment Plan</h4>
                    <p className="text-sm text-gray-600">
                      Receive prescriptions and follow-up recommendations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
