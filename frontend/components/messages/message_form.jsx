import React from 'react';
import Errors from '../errors';
import { dmNameHelper } from '../../utils/helpers';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      placeholder: this.placeholderHelper()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttons = this.buttons.bind(this);
    this.placeholderHelper = this.placeholderHelper.bind(this);
  }

  handleChange(e) {
    this.setState({
      body: e.currentTarget.value
    });
  }

  componentDidMount() {
    if (this.props.type === "edit") {
      this.setState({ body: this.props.messageInfo.body });
    }
  }

  componentDidUpdate(newProps) {
    // debugger
    if (
      (this.props.currentConversation.id !==
      newProps.currentConversation.id) ||
      (Object.keys(this.props.directMessages).length !==
      Object.keys(newProps.directMessages).length)) {
      this.setState({
        placeholder: this.placeholderHelper()
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body.length > 0) {
      if (this.props.type === "new") {
        this.setState({ body: "" });
        this.props.createMessage(this.state, this.props.currentConversation.id);
        this.props.updateScroll();
      } else if (this.props.type === "edit") {
        this.props.editMessage(
          Object.assign({}, this.props.messageInfo, this.state),
          this.props.unmount()
        );
      }
    }
  }

  buttons() {
    if (this.props.type === "edit") {
      return (
        <div className="editButtons">
          <button onClick={this.props.unmount} className="cancel">Cancel</button>
          <button onClick={this.handleSubmit}>Save Changes</button>
        </div>
      );
    }
  }

  placeholderHelper() {
    const conversation = this.props.currentConversation;

    if (this.props.type === "edit") {
      return "";
    } else if (conversation.direct_message) {

      return "Message #" + dmNameHelper(
        this.props.currentConversation,
        this.props.currentUser
      );
    } else {
      return "Message #" + conversation.name;
    }
  }

  render() {
    return (
      <form
        ref="messageForm"
        className={this.props.type + "-message-form"}
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          value={this.state.body}
          placeholder={this.state.placeholder}
          onChange={this.handleChange}
        />
        <Errors errorInfo={this.props.errors}/>
        {this.buttons()}
      </form>
    );
  }
}

export default MessageForm;
