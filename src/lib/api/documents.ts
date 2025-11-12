import { http } from './http';
import { PdfDocumentListItemSchema, PdfDocument } from './types';
import { z } from 'zod';

export async function uploadDocument(file: File, description?: string): Promise<PdfDocument> {
  const formData = new FormData();
  formData.append('document', file);
  if (description) {
    formData.append('description', description);
  }

  const response = await http.post('/upload-document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.document;
}

export async function getMyDocuments() {
  const response = await http.get('/my-documents');
  const documentsArray = z.array(PdfDocumentListItemSchema).parse(response.data);
  return documentsArray;
}

export async function deleteDocument(id: string): Promise<void> {
  await http.delete(`/documents/${id}`);
}

export async function downloadDocument(id: string): Promise<Blob> {
  const response = await http.get(`/documents/${id}/download`, {
    responseType: 'blob',
  });
  return response.data;
}
