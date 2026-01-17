import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../App/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };
if (!user) {
  return <p>Loading user...</p>
}

  // Optional: fallback if user is somehow null/undefined
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user.email?.split("@")[0] || user.email}
          </h1>
          <p className="text-gray-600 mt-1">
            Member since: {new Date(user.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">My Books</h2>
          <p className="text-gray-500">0 books</p>
          <p className="text-sm text-gray-400 mt-1">Feature coming soon</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Orders</h2>
          <p className="text-gray-500">0 orders</p>
          <p className="text-sm text-gray-400 mt-1">Feature coming soon</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile</h2>
          <div className="space-y-1 text-gray-600">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            {user.name && (
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
            )}
            <p>
              <span className="font-medium">ID:</span> {user.$id?.slice(0, 8)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;