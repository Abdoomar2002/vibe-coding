export class SectionResponseDto {
  _id: string;
  idea: string;
  sections: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 