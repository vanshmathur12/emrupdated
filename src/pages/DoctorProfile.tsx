import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award,
  Briefcase,
  Edit,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    qualification: 'MBBS, MD (Cardiology)',
    experience: '15 years',
    location: 'City General Hospital, New York',
    registrationNo: 'MED-2024-12345',
    bio: 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention. Dedicated to providing compassionate care and improving patient outcomes through evidence-based medicine.',
    languages: ['English', 'Spanish', 'French'],
    consultationFee: '$150',
    availability: 'Mon-Fri: 9:00 AM - 5:00 PM'
  });

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-3xl">SJ</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.specialization}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{profile.qualification}</Badge>
                  <Badge variant="outline">{profile.experience} experience</Badge>
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Reg. No: {profile.registrationNo}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Professional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={profile.specialization}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, specialization: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={profile.qualification}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, qualification: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={profile.experience}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, experience: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registrationNo">Registration Number</Label>
              <Input
                id="registrationNo"
                value={profile.registrationNo}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, registrationNo: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact & Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Contact & Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={profile.availability}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, availability: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>Professional biography and expertise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              disabled={!isEditing}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <Badge key={lang} variant="secondary">{lang}</Badge>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="consultationFee">Consultation Fee</Label>
              <Input
                id="consultationFee"
                value={profile.consultationFee}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, consultationFee: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
