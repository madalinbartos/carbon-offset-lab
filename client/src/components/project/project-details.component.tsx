import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import AuthService from "../../services/auth.service";
import ProjectService from "../../services/project.service";
import IProjectEntity from "../../types/project.entity.type";
import IUser from "../../types/user.type";

interface RouterProps {
  history: string;
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  project: IProjectEntity | undefined;
  currentUser: IUser | undefined;
  loading: boolean;
  message: string[] | string;
};

export default class ProjectDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      project: undefined,
      currentUser: undefined,
      loading: false,
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

      const { id } = this.props.match.params;
      if (id) {
        ProjectService.getProjectById(id).then(
          (response) => {
            this.setState({
              project: response.data,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage,
            });
          }
        );
      }
    }
  }

  handleRemoveClick(id: string) {
    ProjectService.deleteProject(parseInt(id)).then(
      () => {
        this.props.history.push("/");
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

  render() {
    const { project, currentUser } = this.state;
    const { id } = this.props.match.params;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="bg-light mt-4 p-5">
              <div className="card-body">
                <h3 className="card-title">{project?.name}</h3>
                <p className="fst-italic">
                  Created by: {project?.userName} (@{project?.userUsername})
                </p>
                <p className="card-text">{project?.description}</p>
                <p className="card-text">
                  <b>Funding goal:</b>{" "}
                  {project && formatter.format(project.fundingGoal)}
                </p>
                <p className="card-text">
                  <b>Location:</b> {project?.location}
                </p>
                <div>
                  <div className="d-flex align-items-end justify-content-end">
                    {currentUser && currentUser.id === project?.userId && (
                      <>
                        <Link to={`/edit-project/${project?.id}`}>
                          <button className="btn btn-light mx-2">
                            <FontAwesomeIcon
                              icon={faPen}
                              className="text-info"
                              size="lg"
                            />
                          </button>
                        </Link>
                        <button
                          className="btn btn-light"
                          onClick={() => this.handleRemoveClick(id)}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
