import React, { Component } from 'react'
import TweetDataService from "../services/TweetDataService";
import "./ViewTweets.css";
import { AiFillLike, AiOutlineFieldTime } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router-dom";

class ViewMytweetComponent extends Component {

    constructor(props) {
        super(props)
        this.onChangeReply = this.onChangeReply.bind(this);
        this.state = {
            Tweet: [],
            reply: "",
            user: AuthService.getCurrentUser()
        }

        this.deleteTweet = this.deleteTweet.bind(this);

    }

    updateTweet(Tweetloginid, uuid) {
        const { user } = this.state;
        var loginId = user.userId;
        console.log(Tweetloginid, loginId);
        if (Tweetloginid === loginId) {
            this.props.history.push(`/update/${uuid}`);
            window.location.reload();
        }
        else {
            alert(" U Cannot Update Others Tweet...Press  OK and Continue Tweet..Thank You!!");
        }
    }

    replyViewTweet(Tweetloginid, Tweetuuid) {
        this.props.history.push(`/view/${Tweetuuid}/${Tweetloginid}`);
        window.location.reload();

    }



    likeTweet(uuid) {
        const { user } = this.state;
        var loginId = user.userId;
        TweetDataService.likeATweet(loginId, uuid).then(
            () => {

                this.componentDidMount();
            });

    }

    replyTweet(uuid) {
        const { user } = this.state;
        var loginId = user.userId;
        TweetDataService.replyATweet(loginId, uuid, this.state.reply).then(
            () => {

                window.location.reload();
            });
    }

    deleteTweet(Tweetloginid, uuid) {
        const { user } = this.state;
        var loginId = user.userId;
        // console.log(Tweetloginid);
        // console.log("UUID", uuid);
        if (Tweetloginid === loginId) {
            TweetDataService.deleteATweet(loginId, uuid).then((res) => {
                this.setState({
                    Tweet: this.state.Tweet.filter(Tweet =>
                        Tweet.tweetId !== uuid)
                });
            });
        }
        else {
            alert(" U Cannot Delete Others Tweet...Press  OK and Continue Tweet..Thank You!!");
        }
    }

    componentDidMount() {
        TweetDataService.getAllTweet().then((res) => {
            this.setState({ Tweet: res.data });
        });
    }

    onChangeReply(e) {
        this.setState({
            reply: e.target.value
        });
    }


    render() {
        return (
            <div>
                <div  class="card">
                    {
                this.state.Tweet.map(
                    Tweet =>
                    <div key={Tweet.uuid} class="card-body">
                        <h5 class="card-title">@{Tweet.userId}</h5>
                        <p class="card-text">{Tweet.tweet}</p>
                        <Form style={{ marginBottom: "5px" }}>
                            <Input type="textbox" className="replybox" name={Tweet.uuid}  placeholder="commnet here.." onChange={this.onChangeReply} value={this.state[Tweet.uuid] || ""}></Input>
                            <Button onClick={() => this.likeTweet(Tweet.tweetId)} variant="outline-info"><AiFillLike /></Button>&nbsp;&nbsp;&nbsp;
                            {Tweet.like}<br></br><AiOutlineFieldTime /> {Tweet.timeStamp} <br/>
                            <Button onClick={() => this.replyTweet(Tweet.tweetId)}>Reply</Button>
                        </Form>
                        <button onClick={ () => this.updateTweet(Tweet.userId,Tweet.tweetId)} class="btn btn-primary">Update</button>
                        <button style={{ marginLeft: "10px" }} onClick= {() => this.deleteTweet(Tweet.userId,Tweet.tweetId)} class="btn btn-primary">Delete</button>
                        <button style={{ marginLeft: "10px" }} onClick={ () => this.replyViewTweet(Tweet.userId,Tweet.tweetId)} class="btn btn-primary">View Comment</button>
                    </div>
                )
            }
                </div>
            </div>
        )
    }
}

export default withRouter(ViewMytweetComponent)