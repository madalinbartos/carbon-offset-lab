import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";
import ProjectService from "../../services/project.service";

interface RouterProps {
  history: string;
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  name: string;
  description: string;
  fundingGoal: number;
  location: string;
  projectId: string;
  initialValues: {
    name: string;
    description: string;
    fundingGoal: number;
    location: string;
  };
  loading: boolean;
  message: string[] | string;
};

export default class ProjectCreateUpdate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleCreateOrUpdate = this.handleCreateOrUpdate.bind(this);

    this.state = {
      name: "",
      description: "",
      fundingGoal: 0,
      location: "",
      projectId: "",
      initialValues: {
        name: "",
        description: "",
        fundingGoal: 0,
        location: "",
      },
      loading: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .test(
          "len",
          "Name must be between 5 and 50 characters",
          (val: any) =>
            val && val.toString().length >= 5 && val.toString().length <= 50
        )
        .required("Name is required"),
      description: Yup.string()
        .test(
          "len",
          "Description must be between 20 and 1000 characters",
          (val: any) =>
            val && val.toString().length >= 20 && val.toString().length <= 1000
        )
        .required("Description is required"),
      fundingGoal: Yup.number()
        .test(
          "len",
          "Funding goal must be higher or equal to 1 and lower or equal to 999,999,999",
          (val: any) => val && val >= 1 && val <= 999999999
        )
        .required("Funding goal is required"),
      location: Yup.string()
        .test(
          "len",
          "Location must be between 3 and 50 characters",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 50
        )
        .required("Location is required"),
    });
  }

  handleCreateOrUpdate(formValue: {
    name: string;
    description: string;
    fundingGoal: number;
    location: string;
  }) {
    const { name, description, fundingGoal, location } = formValue;
    const { projectId } = this.state;

    this.setState({
      loading: true,
      message: [],
    });

    if (!projectId) {
      const project = { name, description, fundingGoal, location };
      ProjectService.createProject(project).then(
        () => {
          this.props.history.push("/");
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
    } else {
      const project = { name, description, fundingGoal, location };
      ProjectService.updateProject(projectId, project).then(
        () => {
          this.props.history.push("/");
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

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      this.props.history.push("/login");
    } else {
      const { id } = this.props.match.params;
      if (id) {
        this.setState({
          projectId: id,
        });

        ProjectService.getProjectById(id).then(
          (response) => {
            this.setState({
              initialValues: {
                name: response.data.name,
                description: response.data.description,
                fundingGoal: response.data.fundingGoal,
                location: response.data.location,
              },
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

  render() {
    const { loading, message, initialValues, projectId } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="bg-light mt-4 p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleCreateOrUpdate}
                enableReinitialize={true}
              >
                <Form className="row g-3">
                  <h4 className="mb-4">
                    {projectId ? "Edit project" : "Create a new project"}
                  </h4>

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      as="textarea"
                      rows="10"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fundingGoal">Funding goal (€)</label>
                    <Field
                      name="fundingGoal"
                      type="number"
                      min="0"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="fundingGoal"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <Field
                      name="location"
                      type="text"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-dark float-end rounded-0"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Save</span>
                    </button>
                  </div>

                  {message &&
                    (Array.isArray(message) ? (
                      message.map((m, index) => (
                        <div className="form-group" key={`message-${index}`}>
                          <div
                            className="alert alert-danger rounded-0"
                            role="alert"
                          >
                            {m}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="form-group">
                        <div
                          className="alert alert-danger rounded-0"
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    ))}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
