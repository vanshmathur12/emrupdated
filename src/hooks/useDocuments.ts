import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as documentsApi from '@/lib/api/documents';
import { queryKeys } from '@/lib/utils/queryKeys';

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, description }: { file: File; description?: string }) =>
      documentsApi.uploadDocument(file, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.list() });
    },
  });
}

export function useMyDocuments() {
  return useQuery({
    queryKey: queryKeys.documents.list(),
    queryFn: documentsApi.getMyDocuments,
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentsApi.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.list() });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: documentsApi.downloadDocument,
  });
}
