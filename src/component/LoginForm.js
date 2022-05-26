import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import "./common.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {

  constructor(props) {
    super(props);
    
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmailId = this.onChangeEmailId.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      emailId: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeEmailId(e) {
    this.setState({
      emailId: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.emailId, this.state.password).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
    console.log(this.state);
  }
  render() {
    return (
      
        <div className="loginForm">
        <h1>Welcome to TweetApp</h1>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group mt-5">
              <Input
                type="text"
                className="form-control shadow rounded"
                name="emailID"
                value={this.state.emailId}
                onChange={this.onChangeEmailId}
                validations={[required]}
                placeholder="Enter Email Id"
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                className="form-control shadow mt-3"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-dark btn-block btn-lg mt-3"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />

               <p className="forgot-password text-right mt-3">
                    <a href="/forgotPass">Forgot password?</a>
                </p>
                
                <p className="SignUp text-right">
                    New to TweetApp?<a href="/signUp">Register Here</a>
                </p>
          </Form>
        </div>
      
    );
  }
}

export default withRouter(Login)