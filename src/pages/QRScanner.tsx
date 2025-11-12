import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  QrCode, 
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Building,
  Stethoscope
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock appointment data that would be fetched based on QR scan
const mockAppointmentData = {
  qrCode: 'APT-2024-001',
  patientName: 'John Smith',
  patientId: 'P-001',
  doctorName: 'Dr. Sarah Johnson',
  specialization: 'Cardiology',
  hospitalName: 'City General Hospital',
  department: 'Cardiology',
  date: '2024-01-20',
  time: '10:30 AM',
  reason: 'Follow-up consultation',
  status: 'confirmed',
  qrImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48ZyBmaWxsPSJibGFjayI+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz48cmVjdCB4PSI0MCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPjxyZWN0IHg9IjYwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+PHJlY3QgeD0iMTQwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+PHJlY3QgeD0iMTYwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+PC9nPjwvc3ZnPg=='
};

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedAppointment, setScannedAppointment] = useState<typeof mockAppointmentData | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsScanning(true);
      toast.success('Camera started - Point at QR code');
      
      // Simulate QR scan after 2 seconds
      setTimeout(() => {
        handleQRScanned();
      }, 2000);
    } catch (error) {
      toast.error('Failed to access camera. Please check permissions.');
      console.error('Camera error:', error);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const handleQRScanned = () => {
    stopScanning();
    setScannedAppointment(mockAppointmentData);
    toast.success('Appointment details retrieved');
  };

  const handleCheckIn = () => {
    toast.success('Patient checked in successfully');
    setScannedAppointment(null);
  };

  const handleReset = () => {
    setScannedAppointment(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">QR Code Scanner</h1>
        <p className="text-muted-foreground">Scan patient appointment QR codes for quick check-in</p>
      </div>

      {!scannedAppointment ? (
        <>
          {/* Scanner Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Scan Appointment QR Code
              </CardTitle>
              <CardDescription>
                Position the QR code within the camera frame
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isScanning ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-center">
                    Click the button below to activate your camera and scan the patient's QR code
                  </p>
                  <Button onClick={startScanning} size="lg">
                    <Camera className="h-5 w-5 mr-2" />
                    Start Camera
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border-4 border-primary rounded-lg animate-pulse" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button onClick={stopScanning} variant="destructive">
                      <X className="h-4 w-4 mr-2" />
                      Stop Scanning
                    </Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Position the QR code within the frame
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">1.</span>
                  <span>Click "Start Camera" to activate your device's camera</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Ask the patient to show their appointment QR code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Position the QR code within the camera frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">4.</span>
                  <span>The system will automatically detect and retrieve appointment details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">5.</span>
                  <span>Verify the details and check in the patient</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Appointment Details Card */
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <CardTitle>Appointment Found</CardTitle>
              </div>
              <Badge variant={scannedAppointment.status === 'confirmed' ? 'default' : 'secondary'}>
                {scannedAppointment.status}
              </Badge>
            </div>
            <CardDescription>QR Code: {scannedAppointment.qrCode}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Info */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Information
              </h3>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{scannedAppointment.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Patient ID:</span>
                  <span className="font-medium">{scannedAppointment.patientId}</span>
                </div>
              </div>
            </div>

            {/* Appointment Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Stethoscope className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Doctor</p>
                    <p className="font-medium">{scannedAppointment.doctorName}</p>
                    <p className="text-sm text-muted-foreground">{scannedAppointment.specialization}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{scannedAppointment.hospitalName}</p>
                    <p className="text-sm text-muted-foreground">{scannedAppointment.department}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(new Date(scannedAppointment.date), 'PPP')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{scannedAppointment.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reason for Visit</p>
              <p className="font-medium">{scannedAppointment.reason}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCheckIn} className="flex-1" size="lg">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Check In Patient
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <X className="h-5 w-5 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
