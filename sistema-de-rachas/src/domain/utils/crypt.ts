import bcrypt from 'bcrypt';
import { env } from '../../infra/environment/EnvSchema';

export class AuthService {
  public async hash(password: string): Promise<string> {
    const saltRounds = env.SALTS_PASSWORD || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  public async verify(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const crypt = new AuthService();
