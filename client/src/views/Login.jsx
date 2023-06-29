import React from "react";
import { Layout } from "antd";
import "../assets/css/login.css";
import Art from "../assets/images/Artboard-4-100.jpg";
import Logo from "../assets/images/logo_footer.png";
const { Content } = Layout;

export const Login = () => {
  return (
    <Content className="container-fluid">
      <section className="text-center text-lg-start">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right">
                <div className="card-body p-5 shadow-5 text-center">
                  <img src={Logo} alt="TaaMarbouta" style={{ width: "10%" }} className="mb-5" />
                  <form className="text-start">
                    <h2 className="fw-bold mb-5 text-center">Sign up</h2>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example2">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                      />
                      <label className="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                      />
                      <label className="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src={Art} className="w-100 rounded-4 shadow-4" alt="" />
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default Login;
