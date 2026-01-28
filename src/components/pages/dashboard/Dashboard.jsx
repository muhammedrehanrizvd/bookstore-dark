import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../App/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchUserBooksCount } from "../../../App/slices/BookSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userBooksCount } = useSelector(state => state.book);
            
useEffect(() => {
  if (user?.$id) {
    dispatch(fetchUserBooksCount());
  }
}, [dispatch, user?.$id]);



  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  if (!user) {
    return <p className="p-6">Loading user...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user.email?.split("@")[0]}
          </h1>
          <p className="text-gray-600 mt-1">
            Member since{" "}
            {new Date(user.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700"> Selling Items</h2>
          <p className="text-3xl font-bold mt-2 text-indigo-600">{userBooksCount}</p>
          <p className="text-sm text-gray-400 mt-1">Books you are selling </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">0</p>
          <p className="text-sm text-gray-400 mt-1">Coming soon</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700">Account Status</h2>
          <p className="mt-3 text-green-600 font-medium">Active</p>
          <p className="text-sm text-gray-400 mt-1">No issues detected</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <NavLink to='/sellbook' className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Add Book
          </NavLink>
          <NavLink className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            View Orders
          </NavLink>
          <NavLink className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Edit Profile
          </NavLink>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Overview
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>

          {user.name && (
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
          )}

          <p>
            <span className="font-medium">User ID:</span>{" "}
            {user.$id?.slice(0, 8)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
