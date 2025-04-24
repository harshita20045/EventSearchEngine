import React, { useEffect, useState } from "react";
import axios from "axios";
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>_id</th>
            <th>Name</th>
            <th>Email</th>
            <th> Password</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.mobile}</td>
              <td>{user.city}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
