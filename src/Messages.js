import {Component} from "react";
import React from "react";
import './App.css';
import Moment from 'moment';
import { messages } from './data.json';
import InfiniteScroll from 'react-infinite-scroll-component';

const uniqueMessages = messages.reduce((acc, current) => {
    const x = acc.find(message => message.uuid === current.uuid && message.content === current.content);
    if (!x) {
      	return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);


class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uniqueMessages:uniqueMessages
		};
	}

	fetchMoreData = () => {
		setTimeout(() => {
		  this.setState({uniqueMessages});
		}, 1500);
	};

	remove(index){
		let uniqueMessages = [...this.state.uniqueMessages];
		uniqueMessages.splice(index, 1);
		this.setState({uniqueMessages})
	}

	render() {
		return (
			<ul className="Messages-list">
				<InfiniteScroll
					dataLength={this.state.uniqueMessages.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<p></p>}
					height={450}
				>
					{this.state.uniqueMessages.map(((m, index) => this.renderMessage(m, index)))}
				</InfiniteScroll>
			</ul>
		);
	}

	renderMessage(message, index) {
		let sentAt = message["sentAt"];
		let senderUuid = message["senderUuid"];
		let content = message["content"];
		return (
		<li key={index}>
			<div className="message">
				<p className="sender">
					From: {senderUuid}  
				</p>
				<div className="main"> 
					<div className="content"> 
						{content}
					</div>
					<div className="delete" onClick={this.remove.bind(this, index)}> Delete </div>
				</div>
				<p className="timestamp">
					{Moment(sentAt).format('MMM Do YYYY, h:mm a')}
				</p>
			</div>
		</li>
		);
	}
}


export default Messages;