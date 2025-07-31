import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-orange-500 text-xl">
        Loading...
      </div>
    );
  }

  return !!user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
