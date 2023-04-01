import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import useRoute from '../router';
import { authIsLoggedIn } from '../redux/auth/authOperations';

export const Main = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authIsLoggedIn());
  }, []);

  const routing = useRoute(isLoggedIn);
  useEffect(() => {}, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
