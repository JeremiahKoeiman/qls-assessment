export interface LogoutAuthOptions {
  customParams?: {
    [key: string]: string | number | boolean;
  };
  urlHandler?(url: string): any;
  logoffMethod?: 'GET' | 'POST';
}
