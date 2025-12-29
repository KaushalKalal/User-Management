// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user.schema';
// import { Model } from 'mongoose';

// @Injectable()
// export class UsersService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   findByEmail(email: string) {
//     return this.userModel.findOne({ email, isDeleted: false });
//   }

//   async create(data: any) {
//     const user = new this.userModel(data);
//     return user.save(); // returns SINGLE user, not array
//   }

//   profile(id: string) {
//     return this.userModel.findById(id).select('-password');
//   }

// }

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
}
