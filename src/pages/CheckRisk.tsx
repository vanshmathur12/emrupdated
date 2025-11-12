import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Brain, Upload, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function CheckRisk() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowResults(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select a document to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success('Risk analysis completed');
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setShowResults(false);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          AI Health Risk Assessment
        </h1>
        <p className="text-muted-foreground">Upload medical documents for AI-powered risk analysis</p>
      </div>

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Medical Document
            </CardTitle>
            <CardDescription>
              Upload prescription, lab reports, or medical records for comprehensive risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="document">Medical Document *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
              </p>
            </div>

            {isAnalyzing ? (
              <div className="py-12">
                <LoadingSpinner size="lg" text="Analyzing document with AI..." />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  This may take a few moments
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button 
                  onClick={handleAnalyze}
                  disabled={!selectedFile}
                  className="flex-1"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Risk
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment Results
              </CardTitle>
              <CardDescription className="text-amber-800 dark:text-amber-200">
                AI-powered analysis of your medical document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-amber-900 dark:text-amber-100">
                <p className="font-medium text-base">Patient Information:</p>
                <p>
                  The prescription indicates that <strong>Ismail Shaik</strong>, a 45-year-old man, tested COVID-19 positive and, 
                  a few days later, developed right-sided cheek pain, headache, and loss of vision in the right eye.
                  He is a known diabetic (on insulin) and has hypertension.
                </p>

                <p className="font-medium text-base mt-4">Diagnosis & Assessment:</p>
                <p>
                  The doctor suspects <strong>invasive rhino-orbital mucormycosis</strong>, a serious fungal infection that can 
                  occur in post-COVID diabetic patients. Examination showed infection in the nasal cavity (right middle meatus) 
                  and loss of vision (light perception only) in the affected eye—signs that the infection has spread to the 
                  sinuses and orbit.
                </p>

                <p className="font-medium text-base mt-4">Recommended Actions:</p>
                <p>
                  The patient was advised MRI of the brain and orbit, eye specialist consultation, surgical and pulmonary 
                  fitness tests, and preparation for surgery to remove the infected tissue (endonasal debridement).
                </p>

                <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-300 dark:border-amber-700">
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    ⚠️ Critical Priority: Immediate medical attention recommended
                  </p>
                  <p className="text-xs mt-2 text-amber-800 dark:text-amber-200">
                    This is a serious condition requiring urgent specialist intervention. Please consult with your healthcare 
                    provider immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Button onClick={handleReset} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Analyze Another Document
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
