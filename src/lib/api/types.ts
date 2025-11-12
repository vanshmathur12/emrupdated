import { z } from 'zod';

export const PdfDocumentListItemSchema = z.object({
  _id: z.string(),
  filename: z.string(),
  uploadedAt: z.string(),
});
export type PdfDocumentListItem = z.infer<typeof PdfDocumentListItemSchema>;

export const PdfDocumentSchema = z.object({
  _id: z.string(),
  filename: z.string(),
  originalName: z.string().optional(),
  path: z.string().optional(),
  size: z.number().optional(),
  mimetype: z.string().optional(),
  uploadedBy: z.string().optional(),
  user: z.string().optional(),
  description: z.string().optional(),
  processingStatus: z.string().optional(),
  uploadedAt: z.string(),
});
export type PdfDocument = z.infer<typeof PdfDocumentSchema>;
