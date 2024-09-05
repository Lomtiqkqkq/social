import { UserCreate } from '../@types/user';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
export class AuthService {
  constructor(private usersService: UsersService) {
  }
  async registration(createAttrs: UserCreate) {
    const candidate = await this.usersService.getUserByEmail(createAttrs.email);
    if(candidate) {
      return Error('user already registered');
    }
    const hashedPassword = bcrypt.hashSync(createAttrs.password, 10);
    const newUser = await this.usersService.create(...createAttrs, { password: hashedPassword })
    const tokens = await this.generateTokens({username: newUser.username, email: newUser.email})

  }
  async generateTokens(data: UserCreate,) {
    return jwt.sign({ data: data }, String(process.env.PRIVATE_KEY), { expiresIn: '1h' })
  }
  async logIn(email: string, password: string) {
    const candidate = await this.usersService.getUserByEmail(email)
    const validatePass = bcrypt.compare(password, candidate.password)
    if(!candidate || !validatePass) {
      throw new Error('candidate not found!')
    }
    const tokens = await this.generateTokens({username: candidate.username, email: email})
    await this.usersService.patchUser()
  }
}
