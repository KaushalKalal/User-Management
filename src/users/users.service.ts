import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email, isDeleted: false });
  }

  async create(data: any) {
    const user = new this.userModel(data);
    return user.save(); // returns SINGLE user, not array
  }

  profile(id: string) {
    return this.userModel.findById(id).select('-password');
  }
}
