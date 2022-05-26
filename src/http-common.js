import axios from "axios";
export default axios.create({
  baseURL: "http://alb-tweetapp-683263207.us-east-2.elb.amazonaws.com/api/v1.0/tweets/",
  headers: {
    "Content-type": "application/json"
  }
});