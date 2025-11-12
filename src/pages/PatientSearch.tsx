import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, User } from 'lucide-react';
import { usePermissions } from '@/components/auth/RoleGuard';
import { EmptyState } from '@/components/common/EmptyState';

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

export default function PatientSearchPage() {
  const { hasPermission } = usePermissions();
  const canSearchPatients = hasPermission('patient_search') || hasPermission('patient_read') || hasPermission('all');
  
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [rmn, setRmn] = useState('');

  const availableDoctors = selectedDept ? doctorsByDept[selectedDept] || [] : [];

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
    setSelectedDoctor(''); // Reset doctor when department changes
  };

  const handleSearch = () => {
    console.log('Searching with:', { selectedDept, selectedDoctor, patientName, rmn });
    // Add actual search logic here
  };

  const handleReset = () => {
    setSelectedDept('');
    setSelectedDoctor('');
    setPatientName('');
    setRmn('');
  };

  if (!canSearchPatients) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <EmptyState
            icon={<Search className="h-12 w-12" />}
            title="Access Restricted"
            description="You don't have permission to search for patients."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Patient Search</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Search for patients using advanced filters
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search Filters
          </CardTitle>
          <CardDescription>Use filters to find specific patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Department Filter */}
            <div className="space-y-2">
              <Label htmlFor="dept">Department</Label>
              <Select value={selectedDept} onValueChange={handleDeptChange}>
                <SelectTrigger id="dept">
                  <SelectValue placeholder="Select department" />
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

            {/* Doctor Filter */}
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select 
                value={selectedDoctor} 
                onValueChange={setSelectedDoctor}
                disabled={!selectedDept}
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder={selectedDept ? "Select doctor" : "Select department first"} />
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

            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* RMN (Hospital ID) */}
            <div className="space-y-2">
              <Label htmlFor="rmn">RMN (Hospital ID)</Label>
              <Input
                id="rmn"
                placeholder="Enter RMN"
                value={rmn}
                onChange={(e) => setRmn(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search Patients
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Section - Can be populated with actual results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>Patient records matching your search criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title="No search performed"
              description="Use the filters above to search for patients"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}