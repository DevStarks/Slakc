import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import MessageMiddleware from './message_middleware';
import ChannelMiddleware from './channel_middleware';
import DirectMessageMiddleware from './direct_message_middleware';
import UserBaseMiddleware from './user_base_middleware';
import createLogger from 'redux-logger';

const LoggerMiddleware = createLogger();

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  MessageMiddleware,
  ChannelMiddleware,
  DirectMessageMiddleware,
  UserBaseMiddleware,
  (process.env.NODE_ENV !== "production" ? LoggerMiddleware : null)
);

export default RootMiddleware;
