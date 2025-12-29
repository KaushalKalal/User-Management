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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

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

  @UseGuards(JwtAuthGuard)
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
  @Get('search')
  search(@Query('query') query: string) {
    return this.usersService.searchUsers(query);
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
