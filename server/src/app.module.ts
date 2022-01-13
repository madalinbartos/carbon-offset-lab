import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { routes } from './routes';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    TypeOrmModule.forRoot(),
    UserModule,
    ProjectModule,
  ],

  providers: [],
})
export class AppModule {}
