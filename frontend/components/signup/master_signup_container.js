import { connect } from 'react-redux';
import UsernameSignup from './username_signup';
import PasswordSignup from './password_signup';
import {
  signup,
  checkUsername,
  storeTempUser,
  clearSessionErrors
} from '../../actions/session_actions';


const mapStateToProps = ({ errors, session }) => ({
  errors: errors.sessionErrors,
  tempUser: session.tempUser,
  currentUser: session.currentUser
});

export const UsernameSignupContainer = connect(
  mapStateToProps,
  { checkUsername, storeTempUser, clearSessionErrors }
)(UsernameSignup);

export const PasswordSignupContainer = connect(
  mapStateToProps,
  { checkUsername, signup, clearSessionErrors }
)(PasswordSignup);
