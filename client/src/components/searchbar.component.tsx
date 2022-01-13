import { ChangeEvent, Component } from "react";

type Props = { handleFilter: (query: string) => void };

type State = {};

export default class SearchBar extends Component<Props, State> {
  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.handleFilter(event.target.value);
  }

  render() {
    return (
      <div className="input-group mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="search-bar">
            Search
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Search"
          aria-describedby="search-bar"
          onChange={(event) => this.handleChange(event)}
        />
      </div>
    );
  }
}
