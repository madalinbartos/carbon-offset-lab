import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import ProjectService from "../services/project.service";
import AuthService from "../services/auth.service";
import IProjectEntity from "../types/project.entity.type";
import IUser from "../types/user.type";

import SearchBar from "../components/searchbar.component";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  projects: IProjectEntity[];
  currentUser: IUser | undefined;
  filter: string;
  message: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      projects: [],
      currentUser: undefined,
      filter: "",
      message: "",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      this.props.history.push("/login");
    } else {
      this.setState({
        currentUser: user,
      });

      ProjectService.getAllProjects().then(
        (response) => {
          this.setState({
            projects: response.data,
          });
        },
        (error) => {
          this.setState({
            message:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
          });
        }
      );
    }
  }

  handleRemoveClick(id: number) {
    const { projects } = this.state;
    ProjectService.deleteProject(id).then(
      () => {
        const project = projects.find((project) => project.id === id);
        if (project) {
          const index = projects.indexOf(project);
          if (index > -1) {
            projects.splice(index, 1);
          }
          this.setState({
            projects: projects,
          });
        }
      },
      (error) => {
        this.setState({
          message:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleFilter(query: string) {
    this.setState({
      filter: query,
    });
  }

  render() {
    const { projects, currentUser, filter, message } = this.state;
    return (
      <div className="container my-5">
        <SearchBar handleFilter={this.handleFilter} />
        {currentUser ? (
          !message ? (
            <>
              {projects
                .sort(
                  (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime()
                )
                .filter(
                  (project) =>
                    project.name.toLowerCase().includes(filter.toLowerCase()) ||
                    project.description
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                )
                .map((project) => (
                  <div className="card rounded-0 my-3" key={project.id}>
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link
                          to={`/project-details/${project.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {project.name}
                        </Link>
                      </h5>

                      <p className="card-text">
                        {project.description.length > 250
                          ? project.description.substring(0, 250) + "[...]"
                          : project.description}
                      </p>
                      <p className="fst-italic">
                        Created by: {project.userName} (@{project.userUsername})
                      </p>
                      <div className="d-flex align-items-end justify-content-end">
                        {currentUser && currentUser.id === project.userId && (
                          <>
                            <Link to={`/edit-project/${project.id}`}>
                              <button className="btn btn-light mx-2 rounded-0">
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="text-info"
                                  size="lg"
                                />
                              </button>
                            </Link>
                            <button
                              className="btn btn-light rounded-0"
                              onClick={() => this.handleRemoveClick(project.id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-danger"
                                size="lg"
                              />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              <div>Oops! Something went wrong.</div>
            </>
          )
        ) : (
          <div>Please log in to see the projects.</div>
        )}
      </div>
    );
  }
}
