import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../common/api";
import Notification, { Notice } from "../../components/notification";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [notice, setNotice] = useState<Notice | null>(null);

  const handleCloseNotice = () => {
    setNotice(null);
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      userName &&
      userName !== "" &&
      email &&
      email !== "" &&
      firstName &&
      firstName !== "" &&
      lastName &&
      lastName !== "" &&
      password &&
      password !== "" &&
      passwordConfirm &&
      passwordConfirm !== ""
    ) {
      const reqBody = {
        user_name: userName,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        profile_picture: "",
      };

      const res = await post("/user/create", reqBody);

      if(res.success){
        // Go to login page
        navigate("/login");
      }
      else{
        setNotice({message: res.data.message ?? "Register fail", type: "error"})
      }
    }
  };

  useEffect(() => {
    document.title = "Register  - Chatdy";
  }, []);

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Create Account
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="userName"
                              type="text"
                              value={userName}
                              maxLength={20}
                              minLength={8}
                              required
                              placeholder="Enter user name"
                              onChange={handleUserNameChange}
                            />
                            <label htmlFor="userName">User name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              id="email"
                              type="email"
                              value={email}
                              required
                              placeholder="Enter your email"
                              onChange={handleEmailChange}
                            />
                            <label htmlFor="email">Email</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="firstName"
                              type="text"
                              value={firstName}
                              maxLength={50}
                              required
                              placeholder="Enter first name"
                              onChange={handleFirstNameChange}
                            />
                            <label htmlFor="firstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              id="lastName"
                              type="text"
                              value={lastName}
                              maxLength={50}
                              required
                              placeholder="Enter last name"
                              onChange={handleLastNameChange}
                            />
                            <label htmlFor="lastName">Last name</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="password"
                              type="password"
                              value={password}
                              minLength={8}
                              maxLength={25}
                              required
                              placeholder="Create a password"
                              onChange={handlePasswordChange}
                            />
                            <label htmlFor="password">Password</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="passwordConfirm"
                              type="password"
                              value={passwordConfirm}
                              minLength={8}
                              maxLength={25}
                              required
                              placeholder="Confirm password"
                              onChange={handlePasswordConfirmChange}
                            />
                            <label htmlFor="passwordConfirm">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <Link to="/login">Have an account? Go to login</Link>
                      {/* Have an account? Go to login */}
                      {/* <a href="login.html">Have an account? Go to login</a> */}
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

      {notice && <Notification notice={notice} onClose={handleCloseNotice} />}
    </div>
  );
}
