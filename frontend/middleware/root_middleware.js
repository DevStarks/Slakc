import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import MessageMiddleware from './message_middleware';
import createLogger from 'redux-logger';

const LoggerMiddleware = createLogger();

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  MessageMiddleware,
  LoggerMiddleware
);

export default RootMiddleware;
