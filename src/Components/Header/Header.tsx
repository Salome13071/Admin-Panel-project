import { useAuth } from "../Guard/guard";
import "./Header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <div>
        <h2 className="logoText"> Admin Panel </h2>
      </div>

      <div>
        <button onClick={useAuth().logout}>Log Out</button>
      </div>
    </div>
  );
}
