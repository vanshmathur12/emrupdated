import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, Building2, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const hospitals = [
  { id: '1', name: 'City General Hospital' },
  { id: '2', name: 'St. Mary Medical Center' },
  { id: '3', name: 'Central Healthcare Hospital' },
  { id: '4', name: 'Metropolitan Hospital' },
];

const departments = [
  { id: '1', name: 'Cardiology' },
  { id: '2', name: 'Neurology' },
  { id: '3', name: 'Orthopedics' },
  { id: '4', name: 'Pediatrics' },
  { id: '5', name: 'General Medicine' },
];

const doctorsByDept: Record<string, { id: string; name: string }[]> = {
  '1': [
    { id: 'd1', name: 'Dr. Sarah Johnson' },
    { id: 'd2', name: 'Dr. Michael Chen' },
    { id: 'd3', name: 'Dr. Emily Rodriguez' },
  ],
  '2': [
    { id: 'd4', name: 'Dr. Robert Williams' },
    { id: 'd5', name: 'Dr. Lisa Anderson' },
    { id: 'd6', name: 'Dr. James Taylor' },
  ],
  '3': [
    { id: 'd7', name: 'Dr. David Brown' },
    { id: 'd8', name: 'Dr. Jennifer Martinez' },
    { id: 'd9', name: 'Dr. Thomas Wilson' },
  ],
  '4': [
    { id: 'd10', name: 'Dr. Maria Garcia' },
    { id: 'd11', name: 'Dr. Christopher Lee' },
    { id: 'd12', name: 'Dr. Amanda White' },
  ],
  '5': [
    { id: 'd13', name: 'Dr. John Smith' },
    { id: 'd14', name: 'Dr. Patricia Davis' },
    { id: 'd15', name: 'Dr. Kevin Moore' },
  ],
};

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const visitReasons = [
  'Follow Up',
  'Consultation',
  'Routine Check Up',
  'Emergency',
  'Lab Results Review',
  'Vaccination',
  'Other',
];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const availableDoctors = selectedDept ? doctorsByDept[selectedDept] || [] : [];

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
    setSelectedDoctor(''); // Reset doctor when department changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital || !selectedDept || !selectedDoctor || !date || !selectedTime || !selectedReason) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Appointment booked successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule a consultation with our doctors</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hospital & Department Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Hospital & Department
            </CardTitle>
            <CardDescription>Select hospital and department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital Name *</Label>
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger id="hospital">
                  <SelectValue placeholder="Select a hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department Name *</Label>
              <Select value={selectedDept} onValueChange={handleDeptChange}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Select Doctor
            </CardTitle>
            <CardDescription>Choose your preferred doctor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor Name *</Label>
              <Select 
                value={selectedDoctor} 
                onValueChange={setSelectedDoctor}
                disabled={!selectedDept}
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder={selectedDept ? "Select a doctor" : "Select department first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Selection */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>Choose appointment date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
                disabled={(date) => date < new Date()}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Select Time
                </CardTitle>
                <CardDescription>Choose a time slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reason for Visit */}
        <Card>
          <CardHeader>
            <CardTitle>Reason for Visit</CardTitle>
            <CardDescription>Select the purpose of your appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Visit Type *</Label>
              <Select value={selectedReason} onValueChange={setSelectedReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason for visit" />
                </SelectTrigger>
                <SelectContent>
                  {visitReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional information about your visit..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={!selectedHospital || !selectedDept || !selectedDoctor || !date || !selectedTime || !selectedReason}
          >
            Confirm Appointment
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
