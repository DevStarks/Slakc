import React from 'react';
import MessageContainer from './message_container';
import MessageFormContainer from './message_form_container';
import { hashToArray } from '../../utils/helpers';
import { hashHistory } from 'react-router';



class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.subscribeToPusher = this.subscribeToPusher.bind(this);
    this.getMessages = this.props.getMessages.bind(this);
  }

  componentDidMount() {
    this.props.getMessages(this.props.currentConversation.id);
    setTimeout(this.updateScroll(), 0);
    this.subscribeToPusher(this.props);
  }

  subscribeToPusher(props) {
    this.pusher = new Pusher('2283e10f108057ca0b00', { encrypted: true });
    const conversationID = props.currentConversation.id;
    const channel = this.pusher.subscribe(`conversation-${conversationID}`);
    channel.bind('message_created', () => {
      props.getMessages(props.currentConversation.id);
    });
  }

  componentWillUnmount() {
    const conversationID = this.props.currentConversation.id;
    this.pusher.unsubscribe(`conversation-${conversationID}`);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currentConversation.id !== newProps.currentConversation.id) {
      newProps.getMessages(newProps.currentConversation.id);
    }

    const messages = this.refs.messages;
    this.shouldScrollBottom = (
      messages.scrollTop +
      messages.offsetHeight ===
      messages.scrollHeight
    );

    const conversationID = this.props.currentConversation.id;
    if (conversationID !== newProps.currentConversation.id) {
      this.pusher.unsubscribe(`conversation-${conversationID}`);
      this.subscribeToPusher(newProps);
    }
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) { this.updateScroll(); }
  }

  allMessages() {
    const messages = hashToArray(this.props.messages);
    return hashToArray(this.props.messages).map( (message, i) => {
      let type;
      if (i > 0 && messages[i - 1].author.id === message.author.id) {
        type = "condensed";
      }
      return (
        <MessageContainer key={message.id} info={message} type={type}/>
      );
    });
  }

  updateScroll() {
    const messages = this.refs.messages;
    messages.scrollTop = messages.scrollHeight;
  }

  render() {
    return (
      <div className="messages-display">
        <ul ref="messages">
          {this.allMessages()}
          <article className="message-content-spacer"></article>
        </ul>

        <MessageFormContainer
          updateScroll={this.updateScroll.bind(this)}
          type="new"
        />
      </div>
    );
  }

}

export default Messages;
