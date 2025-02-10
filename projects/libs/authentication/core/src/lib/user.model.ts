export interface AuthenticatedUser {
  sub: string;
  email: string;
  preferred_username: string;
  name: string;
  fullName: string;
  email_verified: boolean;
  company_id: string;
  company_name: string;
  company_type: string;
  permissions: string[];
  roles: string[];
  modules: string[];
  id: string;
  given_name: string;
  middle_name: string;
  family_name: string;
}

export interface UserDataResult {
  userData: AuthenticatedUser;
}
