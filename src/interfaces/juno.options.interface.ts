export interface JunoOptions {
  endpoint: string;
  clientId: string;
  clientSecret: string;
  privateToken: string;
}

export interface JunoAsyncOptions {
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<JunoOptions>;
}
