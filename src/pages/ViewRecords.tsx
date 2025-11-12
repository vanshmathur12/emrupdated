import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Trash2, Loader2, FileImage, Pill, Activity, Folder } from 'lucide-react';
import { useMyDocuments, useDownloadDocument, useDeleteDocument } from '@/hooks/useDocuments';
import { toast } from 'sonner';
import { downloadBlob } from '@/lib/utils/download';
import { format } from 'date-fns';

export default function ViewRecords() {
  const { data: documents, isLoading, error } = useMyDocuments();
  const downloadMutation = useDownloadDocument();
  const deleteMutation = useDeleteDocument();

  const handleDownload = async (id: string, filename: string) => {
    downloadMutation.mutate(id, {
      onSuccess: (blob) => {
        downloadBlob(blob, filename);
        toast.success('Document downloaded successfully');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to download document');
      },
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Document deleted successfully');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to delete document');
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Medical Records</h1>
          <p className="text-muted-foreground">View and manage your uploaded documents</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">Failed to load documents. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categorizeDocuments = (docs: typeof documents) => {
    if (!docs) return { all: [], prescriptions: [], xray: [], imaging: [], other: [] };
    
    return {
      all: docs,
      prescriptions: docs.filter(d => d.filename.toLowerCase().includes('prescription') || 
                                     d.filename.toLowerCase().includes('rx')),
      xray: docs.filter(d => d.filename.toLowerCase().includes('xray') || 
                            d.filename.toLowerCase().includes('x-ray')),
      imaging: docs.filter(d => d.filename.toLowerCase().includes('mri') || 
                               d.filename.toLowerCase().includes('ct') || 
                               d.filename.toLowerCase().includes('scan') ||
                               d.filename.toLowerCase().includes('imaging')),
      other: docs.filter(d => {
        const name = d.filename.toLowerCase();
        return !name.includes('prescription') && !name.includes('rx') && 
               !name.includes('xray') && !name.includes('x-ray') &&
               !name.includes('mri') && !name.includes('ct') && 
               !name.includes('scan') && !name.includes('imaging');
      })
    };
  };

  const categorized = categorizeDocuments(documents);

  const renderDocumentList = (docs: typeof documents) => {
    if (!docs || docs.length === 0) {
      return (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No documents in this category</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{doc.filename}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded {format(new Date(doc.uploadedAt), 'PPP')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(doc._id, doc.filename)}
                disabled={downloadMutation.isPending}
              >
                {downloadMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(doc._id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Medical Records</h1>
          <p className="text-muted-foreground">View and manage your medical documents by category</p>
        </div>
        <Button onClick={() => window.location.href = '/upload-documents'}>
          Upload New Document
        </Button>
      </div>

      {!documents || documents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents uploaded</h3>
            <p className="text-muted-foreground mb-4">Upload your first medical document to get started</p>
            <Button onClick={() => window.location.href = '/upload-documents'}>
              Upload Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Medical Documents</CardTitle>
            <CardDescription>
              {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  All ({categorized.all.length})
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Prescriptions ({categorized.prescriptions.length})
                </TabsTrigger>
                <TabsTrigger value="xray" className="flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  X-Rays ({categorized.xray.length})
                </TabsTrigger>
                <TabsTrigger value="imaging" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Imaging ({categorized.imaging.length})
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Other ({categorized.other.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {renderDocumentList(categorized.all)}
              </TabsContent>

              <TabsContent value="prescriptions" className="mt-6">
                {renderDocumentList(categorized.prescriptions)}
              </TabsContent>

              <TabsContent value="xray" className="mt-6">
                {renderDocumentList(categorized.xray)}
              </TabsContent>

              <TabsContent value="imaging" className="mt-6">
                {renderDocumentList(categorized.imaging)}
              </TabsContent>

              <TabsContent value="other" className="mt-6">
                {renderDocumentList(categorized.other)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
