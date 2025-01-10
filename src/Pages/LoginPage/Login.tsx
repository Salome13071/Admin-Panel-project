import "./Login.css";

function Login() {
  return (
    <div className="main-container">
      <div className="card-container">
        <h1>Admin Panel login</h1>
        <div className="input-container">
          <p>
            <label>Email</label>
            <input type="email" />
          </p>
          <p>
            <label>Password </label>
            <input type="password" />
          </p>
        </div>
        <div className="LoginButton">
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
