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
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(username, password).then(
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
      username: "",
      password: "",
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="bg-light mt-4 p-5">
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleLogin}
              >
                <Form className="row g-3">
                  <h4 className="mb-4">Login to your account</h4>
                  <div className="form-group">
                    <label htmlFor="username">Username or Email Address</label>
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
                      <span>Login</span>
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
