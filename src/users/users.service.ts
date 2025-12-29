import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email, isDeleted: false });
  }

  async create(data: any) {
    const user = new this.userModel(data);
    return user.save();
  }

  profile(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async updateProfile(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select('-password');
  }

  async findAll() {
    return this.userModel.find({ isDeleted: false }).select('-password');
  }

  async softDelete(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }

  async searchByName(name: string) {
    return this.userModel
      .find({
        isDeleted: false,
        name: { $regex: name, $options: 'i' },
      })
      .select('-password');
  }

  async searchByEmail(email: string) {
    return this.userModel
      .find({
        isDeleted: false,
        email: { $regex: email, $options: 'i' },
      })
      .select('-password');
  }

  async paginateUsers(page = 1) {
    const limit = 5;
    const skip = (page - 1) * limit;

    const users = await this.userModel
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .select('-password');

    const total = await this.userModel.countDocuments({ isDeleted: false });

    return {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users,
    };
  }

  async hardDelete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
