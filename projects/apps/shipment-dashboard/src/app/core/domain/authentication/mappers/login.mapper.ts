import { LoginDto } from '../models/login.dto';
import { Login } from '../models/login.model';

export const mapLoginToLoginDto = (credentials: Login): LoginDto => {
  return {
    ...credentials
  } satisfies LoginDto;
};

export const mapLoginDtoToLogin = (credentials: LoginDto): Login => {
  return {
    ...credentials
  } satisfies Login;
};
