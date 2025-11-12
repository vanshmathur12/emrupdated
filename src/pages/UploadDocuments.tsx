import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useUploadDocument } from '@/hooks/useDocuments';
import { toast } from 'sonner';

export default function UploadDocuments() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const uploadMutation = useUploadDocument();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    uploadMutation.mutate(
      { file, description },
      {
        onSuccess: () => {
          toast.success('Document uploaded successfully');
          setFile(null);
          setDescription('');
          // Reset file input
          const fileInput = document.getElementById('file-input') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to upload document');
        },
      }
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Upload Documents</h1>
        <p className="text-muted-foreground">Upload your medical records and documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Document</CardTitle>
          <CardDescription>
            Upload PDF files, images, or other medical documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-input">Select File</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="file-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  disabled={uploadMutation.isPending}
                />
              </div>
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Document Type</Label>
              <Select
                value={description}
                onValueChange={setDescription}
                disabled={uploadMutation.isPending}
              >
                <SelectTrigger id="description">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="routine-checkup">Routine Check-up</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="lab-report">Lab Report</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={!file || uploadMutation.isPending}
              className="w-full"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Accepted File Types</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• PDF documents (.pdf)</li>
          <li>• Images (.png, .jpg, .jpeg)</li>
          <li>• Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  );
}
