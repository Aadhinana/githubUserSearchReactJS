import React from "react";
import Spinner from "../Spinner";

class UserDeatil extends React.Component {
  // Fetch details of the user selected
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const {
      login,
      name,
      bio,
      avatar_url,
      followers,
      following,
      company,
      html_url,
    } = this.props.user || {};

    if (this.props.loading) return <Spinner />;

    return (
      <React.Fragment>
        <div className="grid-2 card">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="display"
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>@{login}</p>
            <p>Company : {company}</p>
          </div>
          <div>
            <p>{bio}</p>
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              Visit Github
            </a>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-secondary">Following: {following}</div>
        </div>
        {/* Repos sections */}
        <>
          {this.props.repos.map((repo) => {
            return (
              <div className="card text-center" key={repo.id}>
                <a href={repo.html_url}>
                  <h3>{repo.name}</h3>
                </a>
              </div>
            );
          })}
        </>
      </React.Fragment>
    );
  }
}

export default UserDeatil;
