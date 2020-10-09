import React from "react";
import { Link } from "react-router-dom";

// A single user tile.
const User = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <p>{login}</p>
      <a
        href={html_url}
        rel="noopener noreferrer"
        target="_blank"
        className="btn btn-light"
      >
        Visit Github
      </a>
      <Link className="btn btn-dark" to={`/user/${login}`}>
        View Profile
      </Link>
    </div>
  );
};

export default User;
