import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/entities/user.entity';
import { Usr } from '../user/user.decorator';
import { ProjectService } from './project.service';
import { ProjectRequest } from './models/request/project.request';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.projectService.findById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Post()
  create(@Usr() user: UserEntity, @Body() projectRequest: ProjectRequest) {
    return this.projectService.create(user.id, projectRequest);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Usr() user: UserEntity,
    @Param('id') id: string,
    @Body() projectRequest: ProjectRequest,
  ) {
    return this.projectService.update(user.id, +id, projectRequest);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Usr() user: UserEntity, @Param('id') id: string) {
    return this.projectService.remove(user.id, +id);
  }
}
