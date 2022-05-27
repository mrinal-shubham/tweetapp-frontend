import axios from "axios";

const API_URL = "http://tweetapp-demo-alb-398507805.us-east-1.elb.amazonaws.com/api/v1.0/tweets/";
class AuthService {
  login(emailId, password) {
    return axios
      .post(API_URL + "login", {
        emailId,
        password
        
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  register(firstName, lastName, loginId, password, confirmPassword, emailId, contactNumber, resetAnswer) {
    return axios.post(API_URL + "register", {
      firstName,
      lastName,
      loginId,
      password,
      confirmPassword,
      emailId,
      contactNumber,
      resetAnswer
    });
  }

  getCurrentUser() {
    return (JSON.parse(localStorage.getItem('user')));

  }

  logout() {
    localStorage.removeItem("user");
  }

}
export default new AuthService();