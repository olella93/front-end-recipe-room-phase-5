import {useSelector} from "react-redux";
export const useAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated,user, token;
};