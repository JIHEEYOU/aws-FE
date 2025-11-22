import { apiRequest } from './client';

export interface ResumeMeta {
  method: string;
  version?: string;
  [key: string]: unknown;
}

export interface ResumeResponse {
  resumeId: string;
  fileName: string;
  url: string;
}

// 백엔드 /upload-pdf 응답 타입
export interface UploadPdfResponse {
  resume_data: {
    major?: string;
    grade?: string;
    certificates?: string;
    [key: string]: unknown;
  };
  recommended: Array<{
    id: number;
    title: string;
    [key: string]: unknown;
  }>;
}

export async function uploadResume(
  _studentId: string,
  file: File,
  _meta: ResumeMeta,
): Promise<UploadPdfResponse> {
  const formData = new FormData();
  formData.append('file', file);

  // 백엔드 /upload-pdf 엔드포인트 사용 (http://18.188.164.109:8000/upload-pdf)
  return apiRequest<UploadPdfResponse>('/upload-pdf', {
    method: 'POST',
    body: formData,
  });
}

export async function getResume(studentId: string): Promise<ResumeResponse> {
  return apiRequest<ResumeResponse>(`/api/students/${studentId}/resume`, {
    method: 'GET',
  });
}

export interface ResumeWriteData {
  name: string;
  major: string;
  grade: string;
  certificates: string;
}

export async function writeResume(
  studentId: string,
  data: ResumeWriteData,
): Promise<ResumeResponse> {
  return apiRequest<ResumeResponse>(`/api/students/${studentId}/resume/write`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}