import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(data: any) {
    const existing = await this.usersService.findByEmail(data.email);

    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      password: hash,
      role: 'user',
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: any) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwt.sign({ id: user._id, role: user.role });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
