import { UserCreate } from '../@types/user';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export class AuthService {
  constructor(private usersService: UsersService) {}
  async registration(createAttrs: UserCreate) {
    const candidate = await this.usersService.getUserByEmail(createAttrs.email);
    if (candidate) {
      throw new Error('something went wrong');
    }
    const hashedPassword = bcrypt.hashSync(createAttrs.password, 10);
    const newUser = await this.usersService.create({
      ...createAttrs,
      password: hashedPassword,
    });
    newUser.role = 'USER';
    const tokens = await this.generateTokens(
      newUser.username,
      newUser.id,
      newUser.role,
    );
    const hashedRToken = bcrypt.hashSync(tokens['refreshToken'], 10);
    newUser.refreshTokens.push(hashedRToken);
    return tokens;
  }
  async generateTokens(username: string, userId: number, roles?: string) {
    const accessToken = jwt.sign(
      { userInfo: { username: username, userId: userId, roles: roles } },
      String(process.env.SECRET_ACCESS_TOKEN),
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      { userId: userId },
      String(process.env.SECRET_REFRESH_TOKEN),
      { expiresIn: '1d' },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  async logIn(userDto: UserCreate) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(
      userDto.username,
      user.id,
      user.role,
    );
    const hashedRToken = bcrypt.hashSync(tokens['refreshToken'], 10);
    user.refreshTokens.push(hashedRToken);
    return tokens;
  }
  async logOut(id: number, refreshToken: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new Error('id incorrect');
    }
    const hashedRefresh = bcrypt.hashSync(refreshToken, 10);
    const search = user.refreshTokens.indexOf(hashedRefresh);
    if (search !== -1) {
      user.refreshTokens.splice(search, 1);
      return null;
    }
    throw new Error('You are not authorized');
  }

  async validateUser(userDto: UserCreate) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const validatePass = await bcrypt.compare(
      userDto.password,
      <string>user?.password,
    );
    if (user && validatePass) {
      return user;
    }
    throw new Error('password or email not correct');
  }
  async parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
  //TODO CLEAN UPDATE_ACCESS_TOKEN
  async updateAccessToken(refreshToken: string) {
    const dataFromToken = await this.parseJwt(refreshToken);
    const user = await this.usersService.getUserById(dataFromToken['userId']);
    // if (!user) {
    //   throw new Error('user not found');
    // }
    // const token = user.refreshTokens.map((el) => {
    //   if (el == refreshToken) {
    //     return el;
    //   }
    //   return null
    // });
    // if(token != null ) {
    //   const validating = bcrypt.compare(refreshToken, token);
    // }
  }
  async updateRefreshToken(refreshToken: string) {}
}
