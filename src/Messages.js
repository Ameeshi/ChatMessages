import {Component} from "react";
import React from "react";
import './App.css';
import Moment from 'moment';
import { messages } from './data.json';


class Messages extends Component {
  render() {
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    let sentAt = message["sentAt"];
    let uuid = message["uuid"];
    let senderUuid = message["senderUuid"];
    let content = message["content"];
    let messageFromMe = message.uuid === message.senderUuid;
    return (
      <li >
        <div className="message">
        <div className="sender">
            From: {senderUuid}  
        </div>
        <div className="content"> 
            {content}
        </div>
        <div className="timestamp">
            {Moment(sentAt).format('MMM Do YYYY, h:mm a')}
        </div>
        </div>
      </li>
    );
  }
}


export default Messages;