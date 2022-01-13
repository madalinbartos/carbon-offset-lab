import { UserEntity } from '../../entities/user.entity';

export class UserResponse {
  username: string;
  name: string;
  email: string | null;

  constructor(user: UserEntity) {
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
  }
}
