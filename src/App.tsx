import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Users from "./Pages/UserPage/Users";
import { AuthGuard } from "./Components/Guard/guard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <AuthGuard>
              <Users />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
