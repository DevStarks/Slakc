import React from 'react';
import ReactDOM from 'react-dom';
import { timeFromDateObj } from '../../utils/helpers';
import MessageFormContainer from './message_form_container';



class Message extends React.Component {

  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.unmountEdit = this.unmountEdit.bind(this);
    this.menuOn = this.menuOn.bind(this);

    this.state = {
      type: "show"
    };
  }

  componentDidMount() {
    this.refs.messageActions.style.display = "none";
  }

  handleEditClick() {
    this.setState({ type: "edit" });
  }

  handleDeleteClick() {
    this.props.deleteMessage(this.props.info.id);
  }

  unmountEdit() {
    this.setState({ type: "show" });
  }

  menuOn() {
    this.refs.messageActions.style.display = "block";
    this.refs.actionsButton.style.display = "block";
    $('body').on("click", () => {
      this.refs.messageActions.style.display = "none";
      this.refs.actionsButton.style.display = "none";
    });
  }

  render() {
    const { info: { body, created_at, author } } = this.props;

    if (this.state.type === "show") {
      return (
        <article className="message-content group">
          <img className="author-thumbnail" src={author.image_url}></img>
          <h3>{author.username} </h3>
          <span>{timeFromDateObj(created_at)}</span>
          <br/>
          <p>{body}</p>
          <button ref="actionsButton" onClick={this.menuOn}>...</button>
          <ul ref="messageActions" className="message-actions">
            <li onClick={this.handleEditClick}>Edit message</li>
            <li onClick={this.handleDeleteClick}>Delete message</li>
          </ul>
        </article>
      );
    } else if (this.state.type === "edit") {
      return (
        <MessageFormContainer
          ref="messageEditForm"
          type="edit"
          messageInfo={this.props.info}
          unmount={this.unmountEdit} />
      );
    }
  }
}


export default Message;
