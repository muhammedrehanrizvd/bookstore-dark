import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector(state=>state.auth)
if (loading) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      <p className="text-gray-600 font-medium">Checking authentication...</p>
    </div>
  )}
  
  if ( !isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
