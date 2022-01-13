import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

export const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/user',
        module: UserModule,
      },
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/projects',
        module: ProjectModule,
      },
    ],
  },
];
