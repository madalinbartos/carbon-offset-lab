import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectEntity } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UserModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
