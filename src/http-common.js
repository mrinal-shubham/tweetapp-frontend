import axios from "axios";
export default axios.create({
  baseURL: "http://tweetapp-demo-alb-398507805.us-east-1.elb.amazonaws.com/api/v1.0/tweets/",
  headers: {
    "Content-type": "application/json"
  }
});