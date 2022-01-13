import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  name: string;
  username: string;
  email: string;
  password: string;
  loading: boolean;
  message: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .test(
          "len",
          "Name must be between 3 and 50 characters",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 50
        )
        .required("Name is required"),
      username: Yup.string()
        .test(
          "len",
          "Username must be between 4 and 20 characters",
          (val: any) =>
            val && val.toString().length >= 4 && val.toString().length <= 20
        )
        .required("Username is required"),
      email: Yup.string()
        .email("This is not a valid email address")
        .required("Email is required"),
      password: Yup.string()
        .test(
          "len",
          "Password must be between 8 and 30 characters",
          (val: any) =>
            val && val.toString().length >= 8 && val.toString().length <= 30
        )
        .required("Password is required"),
    });
  }

  handleRegister(formValue: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    const { name, username, email, password } = formValue;

    this.setState({
      loading: true,
      message: "",
    });

    AuthService.register(name, username, email, password).then(
      () => {
        this.props.history.push("/");
        window.location.reload();
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

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      name: "",
      username: "",
      email: "",
      password: "",
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="bg-light mt-4 p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleRegister}
              >
                <Form className="row g-3">
                  <h4 className="mb-4">Create a new account</h4>

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
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger rounded-0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control rounded-0"
                    />
                    <ErrorMessage
                      name="password"
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
                      <span>Register</span>
                    </button>
                  </div>

                  {message && (
                    <div className="form-group">
                      <div
                        className="alert alert-danger rounded-0"
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
