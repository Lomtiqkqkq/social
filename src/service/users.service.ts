import { User } from '../models/user';
import { UserCreate } from '../@types/user';

export class UsersService {
  constructor(private userRepository: typeof User) {}
  async create(createAttrs: UserCreate) {
    return this.userRepository.create(createAttrs);
  }
  async getAllUsers() {}
  async getUserById(id: number) {
    return this.userRepository.findByPk(id);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findByPk(email);
  }
  async patchUser() {}
}
