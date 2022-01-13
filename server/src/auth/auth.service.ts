import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtPayload } from './jwt-payload.interface';
import { LoginRequest, LoginResponse, SignupRequest } from './models';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signupAndLogin(signupRequest: SignupRequest): Promise<LoginResponse> {
    const createdUser = await this.signup(signupRequest);
    return this.getLoginResponse(createdUser);
  }

  async signup(signupRequest: SignupRequest): Promise<UserEntity> {
    const createdUser = await this.userService.createUser(signupRequest);

    try {
      return createdUser;
    } catch (err) {
      Logger.error(err);
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const userEntity = await this.userService.getUserEntityById(payload.id);
    if (
      userEntity &&
      userEntity.id === payload.id &&
      userEntity.email === payload.email &&
      userEntity.username === payload.username
    ) {
      return userEntity;
    }
    throw new UnauthorizedException();
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const userEntity = await this.userService.getUserEntityByUsernameOrEmail(
      loginRequest.username,
    );

    if (
      userEntity === null ||
      userEntity === undefined ||
      !bcrypt.compareSync(loginRequest.password, userEntity.passwordHash)
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.getLoginResponse(userEntity);
  }

  async validateRefreshToken(
    user: UserEntity,
    refreshToken: string,
  ): Promise<UserEntity> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const dbToken = await this.refreshTokenRepository.findOne({
      userId: user.id,
      token: refreshToken,
    });
    if (!dbToken) {
      throw new UnauthorizedException();
    }
    if (new Date() > dbToken.expiry) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = nanoid();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60);
    const token = await this.refreshTokenRepository.findOne({
      userId: userId,
    });
    try {
      if (token) {
        await this.refreshTokenRepository.update(token.token, {
          token: refreshToken,
          expiry: expiryDate,
        });
      } else {
        await this.refreshTokenRepository.save({
          token: refreshToken,
          expiry: expiryDate,
          userId: userId,
        });
      }
      return refreshToken;
    } catch (err) {
      Logger.error(JSON.stringify(err));
    }
  }

  async getLoginResponse(userEntity: UserEntity): Promise<LoginResponse> {
    const payload: JwtPayload = {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
    };

    const refreshToken = await this.generateRefreshToken(userEntity.id);
    const accessToken = await this.jwtService.signAsync(payload);

    return new LoginResponse(accessToken, refreshToken);
  }
}
