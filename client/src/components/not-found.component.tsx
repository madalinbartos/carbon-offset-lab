import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const NotFoundComponent = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="bg-light mt-4 p-5 text-center">
          <h1>
            <FontAwesomeIcon icon={faBug} className="text-dark" size="2x" />
            <div className="my-3">Page not found</div>
          </h1>
          <h4>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage.
          </h4>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundComponent;
