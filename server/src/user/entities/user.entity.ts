import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from 'src/project/entities/project.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Exclude()
  @Column('text')
  passwordHash: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => ProjectEntity, (project) => project.user, {
    cascade: true,
  })
  projects: ProjectEntity[];

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  password: string;

  @BeforeInsert()
  async setPassword(): Promise<void> {
    if (this.password) {
      this.passwordHash = await bcrypt.hash(this.password, 10);
    }
  }
}
