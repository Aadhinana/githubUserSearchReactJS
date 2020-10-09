import React from "react";

import User from "./User";

// Hold the Search results here
class Users extends React.Component {
  render() {
    return (
      <div className="grid-3">
        {this.props.users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

export default Users;
