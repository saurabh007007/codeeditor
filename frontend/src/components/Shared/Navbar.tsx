import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "../AuthComponents/LogoutButton";

export const Navbar: React.FC = () => {
  const { authUser } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="DSAkero Logo"
            className="h-10 w-10 p-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border border-white shadow-md"
          />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSAkero
            </span>
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {authUser ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 focus:outline-none"
                tabIndex={0}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm transition-transform group-hover:scale-105">
                  <img
                    src="/avtar.svg"
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>

              <ul className="absolute right-0 mt-4 hidden group-focus-within:block group-hover:block bg-white shadow-lg border border-gray-200 rounded-xl w-56 z-50 p-3 space-y-2">
                <li>
                  <p className="text-sm font-semibold text-gray-800">
                    {authUser.name}
                  </p>
                  <hr className="my-2 border-gray-200" />
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                </li>

                {authUser.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 transition"
                    >
                      <Code className="w-4 h-4" />
                      Add Problem
                    </Link>
                  </li>
                )}

                <li>
                  <LogoutButton className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
