import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  Plus,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const mockPrescriptions = [
  {
    id: 'RX-2024-001',
    patientName: 'John Smith',
    patientId: 'P-001',
    date: '2024-01-15',
    diagnosis: 'Hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', duration: '30 days' }
    ],
    status: 'active'
  },
  {
    id: 'RX-2024-002',
    patientName: 'Sarah Davis',
    patientId: 'P-002',
    date: '2024-01-14',
    diagnosis: 'Type 2 Diabetes',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '60 days' },
      { name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily', duration: '60 days' }
    ],
    status: 'active'
  },
  {
    id: 'RX-2024-003',
    patientName: 'Mike Johnson',
    patientId: 'P-003',
    date: '2024-01-13',
    diagnosis: 'Bacterial Infection',
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' }
    ],
    status: 'completed'
  },
  {
    id: 'RX-2024-004',
    patientName: 'Emily Brown',
    patientId: 'P-004',
    date: '2024-01-12',
    diagnosis: 'Asthma',
    medications: [
      { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', duration: '90 days' },
      { name: 'Fluticasone', dosage: '250mcg', frequency: 'Twice daily', duration: '90 days' }
    ],
    status: 'active'
  }
];

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<typeof mockPrescriptions[0] | null>(null);

  const filteredPrescriptions = mockPrescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">Manage patient prescriptions and medications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPrescriptions.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPrescriptions.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPrescriptions.filter(p => p.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription Records</CardTitle>
          <CardDescription>Search and view all prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{prescription.id}</p>
                        <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Patient: {prescription.patientName} ({prescription.patientId})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-[52px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(prescription.date), 'PPP')}
                    </span>
                    <span>•</span>
                    <span>{prescription.diagnosis}</span>
                    <span>•</span>
                    <span>{prescription.medications.length} medication(s)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedPrescription(prescription)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prescription Detail Modal (Simple version) */}
      {selectedPrescription && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prescription Details</CardTitle>
                <CardDescription>{selectedPrescription.id}</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setSelectedPrescription(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{selectedPrescription.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-medium">{selectedPrescription.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{format(new Date(selectedPrescription.date), 'PPP')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diagnosis</p>
                <p className="font-medium">{selectedPrescription.diagnosis}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Medications</h3>
              <div className="space-y-3">
                {selectedPrescription.medications.map((med, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{med.name}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Dosage</p>
                        <p>{med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p>{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p>{med.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
