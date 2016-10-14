import { connect } from 'react-redux';
import { getChannelCount, disconnectChannel } from '../../actions/channel_actions';
import Channels from './channels';

const mapStateToProps = ({ channels }) => ({
  userChannels: channels.userChannels,
  channelCount: channels.channelCount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeConversation: ownProps.changeConversation,
  currentConversation: ownProps.currentConversation,
  disconnectChannel: id => dispatch(disconnectChannel(id)),
  getChannelCount: () => dispatch(getChannelCount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
