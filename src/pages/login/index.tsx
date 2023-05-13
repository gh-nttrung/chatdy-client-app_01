import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { post } from "../../common/api";
import { Link, useNavigate } from "react-router-dom";
import Notification, { Notice } from "../../components/notification";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [notice, setNotice] = useState<Notice | null>(null);

  const handleCloseNotice = () => {
    setNotice(null);
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName && password && userName !== "" && password !== "") {
      const url = "/auth/login";
      const reqBody = { user_name: userName, password: password };
      
      const res = await post(url, reqBody);

      if(res.success){
        localStorage.setItem("authToken", `${res.data.token}`);
        // Go to home page
        navigate("/");
      }
      else{
        setNotice({message: res.data.message ?? "Login fail", type: "error"})
      }
    }
  };

  useEffect(() => {
    document.title = "Login - Chatdy";
    localStorage.setItem("authToken", "");
  }, []);

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Login
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="userName"
                          type="text"
                          value={userName}
                          maxLength={20}
                          minLength={5}
                          required
                          placeholder="Your user name"
                          onChange={handleUserNameChange}
                        />
                        <label htmlFor="userName">User name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="password"
                          type="password"
                          value={password}
                          minLength={8}
                          maxLength={25}
                          required
                          placeholder="Password"
                          onChange={handlePasswordChange}
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          id="inputRememberPassword"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inputRememberPassword"
                        >
                          Remember Password
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="password.html">
                          Forgot Password?
                        </a>
                        <button className="btn btn-primary" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <Link to="/register">Need an account? Sign up!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Your Website 2023
              </div>
              <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    
    {notice && (
      <Notification notice={notice} onClose={handleCloseNotice}/>
    )}
    </div>
  );
}
