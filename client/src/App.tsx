import { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import IUser from "./types/user.type";
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import ProjectCreateUpdate from "./components/project/project-create-update.component";
import ProjectDetails from "./components/project/project-details.component";
import NotFoundComponent from "./components/not-found.component";

type Props = {};

type State = {
  currentUser: IUser | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        <Navbar currentUser={currentUser} handleLogOut={this.logOut} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/new-project" component={ProjectCreateUpdate} />
          <Route
            exact
            path="/edit-project/:id"
            component={ProjectCreateUpdate}
          />
          <Route exact path="/project-details/:id" component={ProjectDetails} />
          <Route path="*" exact={true} component={NotFoundComponent} />
        </Switch>
      </>
    );
  }
}

export default App;
