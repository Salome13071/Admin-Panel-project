import { useState, useEffect } from "react";
import "./UserPage.css";

interface User {
  id: number;
  firstName: string;
  email: string;
  age: number;
  role: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((info) => info.json())
      .then((data) => setUsers(data.users));
  }, []);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="table-heading">
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-content">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td className="table-content-age">{user.age}</td>
              <td className="table-content-status">{user.role}</td>
              <td className="table-content-btns">
                <button className="table-content-edit">Edit</button>
                <button className="table-content-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserPage;
