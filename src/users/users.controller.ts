import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.profile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@CurrentUser() user: any, @Body() body: any) {
    return this.usersService.updateProfile(user.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/name')
  searchByName(@Query('name') name: string) {
    return this.usersService.searchByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/email')
  searchByEmail(@Query('email') email: string) {
    return this.usersService.searchByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('paginate')
  paginate(@Query('page') page = '1') {
    return this.usersService.paginateUsers(Number(page));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('hard/:id')
  hardDelete(@Param('id') id: string) {
    return this.usersService.hardDelete(id);
  }
}
