import * as ACT from '../actions/channel_actions';
import { createChannel, getChannelCount, searchChannels, connectToChannel, disconnectChannel } from '../utils/channel_api_util';
import { receiveDirectMessage } from '../actions/direct_message_actions';


const ChannelMiddleware = ({ dispatch }) => next => action => {
  const error = xhr => dispatch(ACT.receiveChannelErrors(xhr.responseJSON));

  switch (action.type) {
    case ACT.CREATE_CHANNEL:
      let success;
      if (action.channel.direct_message) {
        success = messageData => dispatch(receiveDirectMessage(messageData));
      } else {
        success = messageData => dispatch(ACT.receiveChannel(messageData));
      }
      createChannel(action.channel, success, error);
      return next(action);
    case ACT.GET_CHANNEL_COUNT:
      const channelCountSuccess = count => dispatch(ACT.receiveChannelCount(count));

      getChannelCount(channelCountSuccess, error);
      return next(action);
    case ACT.SEARCH_CHANNELS:
      const searchSuccess = channels => {
        dispatch(ACT.receiveChannelResults(channels));
      };
      return searchChannels(action.searchData, searchSuccess, error);
    case ACT.CONNECT_TO_CHANNEL:
      const connectSuccess = channel => {
        dispatch(ACT.receiveChannel(channel));
        return next(action);
      };
      return connectToChannel(action.channelID, connectSuccess, error);
    case ACT.DISCONNECT_CHANNEL:
      const disconnectSuccess = channel => {
        dispatch(ACT.removeChannel(channel));
        return next(action);
      };
      return disconnectChannel(action.channelID, disconnectSuccess);
    default:
      next(action);
  }
};

export default ChannelMiddleware;
