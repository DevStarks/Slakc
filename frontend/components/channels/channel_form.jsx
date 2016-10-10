import React from 'react';

class ChannelForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      purpose: ""
    };

    this.updateField = this.updateField.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleCancel() {
    this.props.closeNewChannelForm();
  }

  handleCreate() {
    this.props.createChannel(this.state);
  }

  render() {
    return (
      <form>
        <h1>Create a channel</h1>

        <label>Name
          <input
            placeholder="# e.g. jokes"
            onChange={this.updateField("name")}
            value={this.state.name}
          />
        </label>

        <label>Purpose <span>(optional)</span>
          <input
            onChange={this.updateField("purpose")}
            value={this.state.purpose}
          />
          <span>What's this channel about?</span>
        </label>

        <button onClick={this.handleCancel}>Cancel</button>
        <button onClick={this.handleCreate}>Create Channel</button>
      </form>
    );
  }
}

export default ChannelForm;
