import { ProjectEntity } from '../../entities/project.entity';

export class ProjectResponse {
  id: number;
  name: string;
  description: string;
  fundingGoal: number;
  location: string;
  userId: number;
  userUsername?: string;
  userName?: string;
  created: Date;
  updated: Date;

  constructor(project: ProjectEntity) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.fundingGoal = project.fundingGoal;
    this.location = project.location;
    this.userId = project.userId;
    this.userUsername = project.user?.username;
    this.userName = project.user?.name;
    this.created = project.created;
    this.updated = project.updated;
  }
}
