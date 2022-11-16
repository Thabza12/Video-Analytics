export interface SPOpenCVLocateFileFn {
  (path: string, scriptDirectory: string): any;
}

export interface SPOpenCvRuntimeInitializedFn {
  (): any;
}

export interface SPOpenCVOptions {
  scriptUrl: string;
  wasmBinaryFile?: string;
  usingWasm?: boolean;
  locateFile?: SPOpenCVLocateFileFn;
  onRuntimeInitialized?: SPOpenCvRuntimeInitializedFn;
}

export interface SPOpenCVLoadResult {
  ready: boolean;
  error: boolean;
  loading: boolean;
}
