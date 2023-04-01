import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';
const { updateUser, isLoggedIn, logOut } = authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authSignUpUser =
  ({ login, email, password }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await updateProfile(user, {
        displayName: login,
      });

      const { uid, displayName } = await auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
      };
      dispatch(updateUser(userUpdateProfile));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };
export const authSignOutUser = () => async dispatch => {
  await signOut(auth);
  dispatch(logOut());
};
export const authIsLoggedIn = () => async dispatch => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(isLoggedIn({ isLoggedIn: true }));
      dispatch(updateUser(userUpdateProfile));
    }
  });
};
