export interface QueueCreateData {
  type: CFE | SPED | REPORT;
  action: IMPORT | EXPORT;
  name: string;
  file?: {
    name: string;
    contentType: string;
  };
  report?: {
    report: string;
  };
}

export interface QueueStartData {
  _id: string;
  type: CFE | SPED | REPORT;
  action: IMPORT | EXPORT;
}

export interface QueueState {
  loading: boolean;
  progress: number;
}

export interface QueueCreateResponse {
  [key: string]: string;
}

export interface Queue {
  fetch: (data: QueueCreateData, file?: FILE) => Promise<QueueCreateResponse | boolean>;
  start: (data: QueueStartData) => Promise<boolean>;
  loading: boolean;
  progress: number;
}
