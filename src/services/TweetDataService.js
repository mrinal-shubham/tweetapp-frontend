import axios from 'axios';

const API_URL = "http://tweetapp-demo-alb-398507805.us-east-1.elb.amazonaws.com/api/v1.0/tweets/";
class TweetService {
  getAllTweet() {
    return axios.get(API_URL + 'all');
  }

  getMyTweet(userId) {
    return axios.get(API_URL +'byUserId/' +userId);
  }

  getTweetByUuid(uuid) {
    return axios.get(API_URL + 'byUuid/' + uuid);
  }

  getUsers() {
    return axios.get(API_URL + 'users/all');
  }

  postTweet(emailId,postdata) {
    return axios.post(API_URL + emailId , postdata,{headers: {'Content-Type': 'application/json'}});
  }

  updateATweet(userId, tweetId,postdata) {
    return axios.put(API_URL + userId + '/update/' + tweetId, postdata, {headers: {'Content-Type': 'application/json'}});
  }

  likeATweet(tweetUserId,id) {
    return axios.put(API_URL + tweetUserId + '/like/' + id);
  }

  replyATweet(id, tweetUserId ,postdata) {
    return axios.post(API_URL + id + '/reply/' + tweetUserId, postdata, {headers: {'Content-Type': 'application/json'}});
  }

  deleteATweet(loginId,tweetId) {
    return axios.delete(API_URL + loginId + '/delete/' + tweetId);
  }
  
}
export default new TweetService();