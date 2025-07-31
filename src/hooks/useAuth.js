import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../features/auth/authSlice';
import { loginUserAPI } from '../features/auth/authAPI';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const login = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const logoutUserHandler = () => {
    dispatch(logoutUser());
  };

  return { user, token, loading, error, login, logoutUser: logoutUserHandler };
};
