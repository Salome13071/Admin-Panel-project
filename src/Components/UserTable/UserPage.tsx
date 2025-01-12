import { useState, useEffect } from "react";
import "./UserPage.css";

interface User {
  id: number;
  firstName: string;
  email: string;
  age: number;
  status: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
    )
      .then((info) => info.json())
      .then((data) => {
        const users = data.users.map((user: any) => ({
          id: user.id,
          firstName: `${user.firstName}`,
          email: user.email,
          age: user.age,
          status: user.isVerified ? "Verified" : "Unverified",
        }));
        setUsers(users);
      });
  }, [page]);

  return (
    <div className="user-container">
      <div className="user-title">
        <p>Actions</p>
        <p>First Name</p>
        <p>Email</p>
        <p>Age</p>
        <p>Status</p>
      </div>
      <div className="user-search"></div>
      {users.map((user, index) => (
        <div
          className="user-details"
          key={user.id}
          style={{
            backgroundColor: index % 2 === 0 ? "white" : "rgb(238, 234, 234)",
          }}
        >
          <div className="user-action">
            <button className="user-action--edit">Edit</button>
            <button className="user-action--delete">Delete</button>
          </div>
          <p className="user-details--firstname">{user.firstName}</p>
          <p className="user-details--email">{user.email}</p>
          <p className="user-details--age">{user.age}</p>
          <p className="user-details--status">{user.status}</p>
        </div>
      ))}
      <div className="pagination-controls">
        <button
          className="previus"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="Next"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPage;
