// Common API response types
export interface ApiInfo {
  name: string;
  version: string;
  description: string;
  environment: string;
}

export interface HealthCheck {
  status: string;
  message: string;
  timestamp: string;
}

// Common utility types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface AppConfig {
  apiBaseUrl: string;
  environment: 'development' | 'production' | 'test';
}