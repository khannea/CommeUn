import React, { Component } from "react";

class UsersPage extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      loading: true,
      users: null
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    // fetch("http://localhost:4000/auth")
    fetch("https://testkhannea.herokuapp.com/auth")
      .then(res => {
        if (res.status === 401) {
          console.log("UserPage n'a pas recu les users");
        } else {
          console.log("UserPage a bien pas recu les users!!");
          return res.json();
        }
      })
      .then(res => this.setState({ users: res, loading: false }));
  }

  render() {
    let { users } = this.state;
    return (
      <div className="m-4">
        <h2>Les utilisateurs inscrit sont:</h2>
        {users && (
          <table className="table">
            <thead>
              <tr>
                <th>pseudo</th>
                <th>Password</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ pseudo, password, id }, index) => (
                <tr key={index}>
                  <td>{pseudo}</td>
                  <td>{password}</td>
                  <td>{id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default UsersPage;
