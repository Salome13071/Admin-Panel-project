// import { useState, useEffect } from "react";
// import "./UserPage.css";

// interface User {
//   id: number;
//   firstName: string;
//   email: string;
//   age: number;
//   status: string;
// }

// const UserPage = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(15);

//   useEffect(() => {
//     fetch(
//       `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
//     )
//       .then((info) => info.json())
//       .then((data) => {
//         const users = data.users.map((user: any) => ({
//           id: user.id,
//           firstName: `${user.firstName}`,
//           email: user.email,
//           age: user.age,
//           status: user.isVerified ? "Verified" : "Unverified",
//         }));
//         setUsers(users);
//       });
//   }, [page]);

//   return (
//     <div className="user-container">
//       <div className="user-title">
//         <p>Actions</p>
//         <p>First Name</p>
//         <p>Email</p>
//         <p>Age</p>
//         <p>Status</p>
//       </div>
//       <div className="user-search"></div>
//       {users.map((user, index) => (
//         <div
//           className="user-details"
//           key={user.id}
//           style={{
//             backgroundColor: index % 2 === 0 ? "white" : "rgb(238, 234, 234)",
//           }}
//         >
//           <div className="user-action">
//             <button className="user-action--edit">Edit</button>
//             <button className="user-action--delete">Delete</button>
//           </div>
//           <p className="user-details--firstname">{user.firstName}</p>
//           <p className="user-details--email">{user.email}</p>
//           <p className="user-details--age">{user.age}</p>
//           <p className="user-details--status">{user.status}</p>
//         </div>
//       ))}
//       <div className="pagination-controls">
//         <button
//           className="previus"
//           onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <button
//           className="Next"
//           onClick={() => setPage((prevPage) => prevPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserPage;

import { useState, useEffect } from "react";
import "./UserPage.css";
import { Search } from "@mui/icons-material";

interface User {
  id: number;
  firstName: string;
  email: string;
  age: number;
  status: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [editId, setEditId] = useState<number | null>(null);
  const [editDetails, setEditDetails] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);

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
        const filtered = users.filter((user: User) => !deleteId.has(user.id));
        setUsers(filtered);
        setFilteredUsers(filtered);
      });
  }, [page, deleteId]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const edit = (user: User) => {
    setEditId(user.id);
    setEditDetails(user);
    setModalOpen(true);
  };
  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editDetails) {
      setEditDetails({
        ...editDetails,
        [field]: e.target.value,
      });
    }
  };
  const save = () => {
    if (editDetails) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editDetails.id ? { ...user, ...editDetails } : user
        )
      );
      setModalOpen(false);
      setEditId(null);
      setEditDetails(null);
    }
  };
  const cancel = () => {
    setModalOpen(false);
    setEditId(null);
    setEditDetails(null);
  };
  const deleteFunction = (id: number) => {
    setDeleteId((deleted) => {
      const updatedDeleted = new Set(deleted.add(id));
      setFilteredUsers(users.filter((user) => !updatedDeleted.has(user.id)));
      return updatedDeleted;
    });
  };

  return (
    <div className="user-container">
      <div className="searchContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search for users(e.g., name) "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="search-icon"
            onClick={() => {
              const lowerSearchTerm = searchTerm.toLowerCase();
              const filtered = users.filter(
                (user) =>
                  user.firstName.toLowerCase().includes(lowerSearchTerm) ||
                  user.email.toLowerCase().includes(lowerSearchTerm)
              );
              setFilteredUsers(filtered);
            }}
          />
        </div>
      </div>

      <div className="user-title">
        <p>Actions</p>
        <p>First Name</p>
        <p>Email</p>
        <p>Age</p>
        <p>Status</p>
      </div>
      <div className="user-search"></div>
      {filteredUsers.map((user, index) => (
        <div
          className="user-details"
          key={user.id}
          style={{
            backgroundColor: index % 2 === 0 ? "white" : "rgb(238, 234, 234)",
          }}
        >
          <div className="user-action">
            <button className="user-action--edit" onClick={() => edit(user)}>
              Edit
            </button>
            <button
              className="user-action--delete"
              onClick={() => deleteFunction(user.id)}
            >
              Delete
            </button>
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
      {/* პოპაპი */}
      {modalOpen && editDetails && (
        <div className="popup">
          <h2>Edit User</h2>
          <div className="popup-content">
            <input
              type="text"
              value={editDetails.firstName}
              onChange={(e) => change(e, "firstName")}
            />
            <input
              type="email"
              value={editDetails.email}
              onChange={(e) => change(e, "email")}
            />
            <input
              type="number"
              value={editDetails.age}
              onChange={(e) => change(e, "age")}
            />
            <input
              type="text"
              value={editDetails.status}
              onChange={(e) => change(e, "status")}
            />
          </div>
          <div className="popup-btns">
            <button className="savechanges" onClick={save}>
              Save changes
            </button>
            <button className="cancelchanges" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
