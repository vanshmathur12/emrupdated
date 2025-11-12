import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  FileText,
  Upload,
  Brain,
  Plus,
  QrCode
} from 'lucide-react';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-01-20', time: '10:00 AM', type: 'Follow-up' },
  { id: 2, doctor: 'Dr. Mike Brown', date: '2024-01-25', time: '02:30 PM', type: 'Consultation' },
];

export function PatientDashboard() {
  const navigate = useNavigate();

  const showQRCode = (appointmentId: number) => {
    // Generate a sample QR code image
    const qrCodeSVG = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="10" y="10" width="30" height="30" fill="black"/>
        <rect x="50" y="10" width="10" height="10" fill="black"/>
        <rect x="70" y="10" width="10" height="10" fill="black"/>
        <rect x="90" y="10" width="10" height="10" fill="black"/>
        <rect x="110" y="10" width="30" height="30" fill="black"/>
        <rect x="150" y="10" width="30" height="30" fill="black"/>
        <rect x="10" y="50" width="10" height="10" fill="black"/>
        <rect x="30" y="50" width="10" height="10" fill="black"/>
        <rect x="50" y="50" width="10" height="10" fill="black"/>
        <rect x="70" y="50" width="30" height="10" fill="black"/>
        <rect x="110" y="50" width="10" height="10" fill="black"/>
        <rect x="130" y="50" width="10" height="10" fill="black"/>
        <rect x="150" y="50" width="10" height="10" fill="black"/>
        <rect x="170" y="50" width="10" height="10" fill="black"/>
        <rect x="10" y="70" width="30" height="30" fill="black"/>
        <rect x="50" y="70" width="10" height="10" fill="black"/>
        <rect x="90" y="70" width="10" height="10" fill="black"/>
        <rect x="110" y="70" width="10" height="10" fill="black"/>
        <rect x="130" y="70" width="10" height="10" fill="black"/>
        <rect x="150" y="70" width="30" height="30" fill="black"/>
        <rect x="50" y="110" width="90" height="10" fill="black"/>
        <rect x="10" y="130" width="30" height="30" fill="black"/>
        <rect x="50" y="130" width="10" height="10" fill="black"/>
        <rect x="70" y="130" width="10" height="10" fill="black"/>
        <rect x="90" y="130" width="30" height="10" fill="black"/>
        <rect x="130" y="130" width="10" height="10" fill="black"/>
        <rect x="150" y="130" width="30" height="30" fill="black"/>
        <rect x="10" y="150" width="10" height="10" fill="black"/>
        <rect x="30" y="150" width="10" height="10" fill="black"/>
        <rect x="50" y="150" width="30" height="10" fill="black"/>
        <rect x="90" y="150" width="10" height="10" fill="black"/>
        <rect x="110" y="150" width="10" height="10" fill="black"/>
        <rect x="150" y="150" width="10" height="10" fill="black"/>
        <rect x="170" y="150" width="10" height="10" fill="black"/>
        <rect x="10" y="170" width="10" height="10" fill="black"/>
        <rect x="30" y="170" width="10" height="10" fill="black"/>
        <rect x="90" y="170" width="30" height="10" fill="black"/>
        <rect x="150" y="170" width="10" height="10" fill="black"/>
        <rect x="170" y="170" width="10" height="10" fill="black"/>
      </svg>
    `)}`;
    
    // Create a modal-like alert with the QR code
    const dialog = document.createElement('div');
    dialog.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;';
    dialog.innerHTML = `
      <div style="background:white;padding:2rem;border-radius:1rem;max-width:400px;text-align:center;">
        <h3 style="margin:0 0 1rem;font-size:1.5rem;font-weight:bold;">Appointment QR Code</h3>
        <img src="${qrCodeSVG}" alt="QR Code" style="width:250px;height:250px;margin:0 auto;border:2px solid #e5e7eb;border-radius:0.5rem;"/>
        <p style="margin:1rem 0;color:#6b7280;font-size:0.875rem;">Scan this code at the hospital</p>
        <p style="margin:0.5rem 0;color:#111827;font-weight:600;">Appointment #${appointmentId}</p>
        <button onclick="this.closest('div[style*=fixed]').remove()" style="margin-top:1.5rem;padding:0.5rem 2rem;background:#3b82f6;color:white;border:none;border-radius:0.5rem;cursor:pointer;font-weight:500;">Close</button>
      </div>
    `;
    document.body.appendChild(dialog);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-muted-foreground">Monitor your health and manage appointments</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/book-appointment')}>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Book Appointment</h3>
            <p className="text-sm text-muted-foreground">Schedule with doctors</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/upload-documents')}>
          <CardContent className="p-6 text-center">
            <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Upload Documents</h3>
            <p className="text-sm text-muted-foreground">Medical records & images</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/view-records')}>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">View Records</h3>
            <p className="text-sm text-muted-foreground">Medical history</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow bg-accent" onClick={() => navigate('/check-risk')}>
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-accent-foreground mx-auto mb-2" />
            <h3 className="font-medium text-accent-foreground">Check My Risk</h3>
            <p className="text-sm text-accent-foreground/80">AI Health Assessment</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Book New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-shrink-0 ml-2"
                    onClick={() => showQRCode(appointment.id)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}