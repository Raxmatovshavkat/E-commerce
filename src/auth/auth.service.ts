import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { OtpService } from './otp/otp.service';
import { RegisterDto } from './dto/user-register.dto';
import { LoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { EmailService } from './Mail/mail.service';
import { UserService } from 'src/user/user.service';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshService: RefreshTokenService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService
  ) { }

  async register(createUserDto: RegisterDto): Promise<User> {
    try {
      const { password, email, first_name, status } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userDto = {
        email,
        password: hashedPassword,
        first_name,
        last_name: 'Doe', 
        status: status || 'inactive' 
      };

      const user = await this.userRepository.create(userDto);

      const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
      await this.emailService.sendEmail(email, otp);
      await this.otpService.saveOtp({ userId: user.id, otp });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async signIn(createLoginDto: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const user = await this.userRepository.findOne(createLoginDto.email); // Adjust method as needed
      if (!user || !(await bcrypt.compare(createLoginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

      if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error('JWT secret not configured');
      }

      const payload = { sub: user.id.toString(), email: user.email };
      const accessToken = this.jwtService.sign(payload, { secret: accessTokenSecret, expiresIn: process.env.ACCESS_EXPIRES_IN });
      const refreshToken = this.jwtService.sign(payload, { secret: refreshTokenSecret, expiresIn: process.env.REFRESH_EXPIRES_IN });

      await this.refreshService.storeRefreshToken(refreshToken, user);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.log(`Sign-in failed: ${error.message}`);
      throw new UnauthorizedException();
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      return this.refreshService.refreshAccessToken(refreshToken);
    } catch (error) {
      console.log(`Token refresh failed: ${error.message}`);
      throw new UnauthorizedException();
    }
  }

  async me(id: string): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      console.log(`Fetching user failed: ${error.message}`);
      throw new UnauthorizedException();
    }
  }

  async logout(userId: any): Promise<void> {
    try {
      await this.refreshService.removeTokensForUser(userId);
      await this.userRepository.remove(userId);
    } catch (error) {
      console.log(`Logout failed: ${error.message}`);
      throw new InternalServerErrorException('Failed to logout');
    }
  }

  async verify(userId: string, otp: string): Promise<void> {
    try {
      await this.otpService.verifyOtp(userId, otp);
      await this.userRepository.update(userId, { status: 'active' });
    } catch (error) {
      console.log(`OTP verification failed: ${error.message}`);
      throw new UnauthorizedException();
    }
  }
}
