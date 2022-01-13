import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ProjectRequest } from './models/request/project.request';
import { ProjectResponse } from './models/response/project.response';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<ProjectResponse[]> {
    const projects = await this.projectRepository.find({ relations: ['user'] });
    return projects.map((project) => {
      return new ProjectResponse(project);
    });
  }

  async findById(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return new ProjectResponse(project);
  }

  async create(userId: number, projectRequest: ProjectRequest) {
    const newProject = new ProjectEntity();
    newProject.name = projectRequest.name;
    newProject.description = projectRequest.description;
    newProject.fundingGoal = projectRequest.fundingGoal;
    newProject.location = projectRequest.location;
    newProject.userId = userId;
    await this.projectRepository.save(newProject);

    return new ProjectResponse(newProject);
  }

  async update(userId: number, id: number, projectRequest: ProjectRequest) {
    const project = await this.projectRepository.findOne({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    } else if (userId !== project.userId) {
      throw new UnauthorizedException('User not authorized');
    } else {
      project.name = projectRequest.name;
      project.description = projectRequest.description;
      project.fundingGoal = projectRequest.fundingGoal;
      project.location = projectRequest.location;
      await this.projectRepository.update(id, project);

      return new ProjectResponse(project);
    }
  }

  async remove(userId: number, id: number) {
    const project = await this.projectRepository.findOne({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    } else if (userId !== project.userId) {
      throw new UnauthorizedException('User not authorized');
    } else {
      await this.projectRepository.delete(id);
    }
  }
}
