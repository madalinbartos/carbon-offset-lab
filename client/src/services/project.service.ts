import axios from "axios";
import IProjectRequest from "../types/project.request.type";

import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api/projects";

class ProjectService {
  getAllProjects() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getProjectById(id: string) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createProject(project: IProjectRequest) {
    return axios.post(API_URL, project, { headers: authHeader() });
  }

  updateProject(id: string, project: IProjectRequest) {
    return axios.put(`${API_URL}/${id}`, project, { headers: authHeader() });
  }

  deleteProject(id: number) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new ProjectService();
