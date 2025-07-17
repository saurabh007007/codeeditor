import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "../AuthComponents/LogoutButton";

export const Navbar: React.FC = () => {
  const { authUser } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="DSAkero Logo"
            className="h-10 w-10 p-1 rounded-full bg-primary/10 border border-gray-300"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            DSAkero
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {authUser ? (
            // ✅ Logged-in User Dropdown
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="cursor-pointer flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                  <img
                    src={
                      authUser.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-50 p-3 shadow-lg bg-white rounded-lg w-56 space-y-2 border border-gray-200"
              >
                <li>
                  <p className="text-base font-semibold text-gray-800">
                    {authUser.name}
                  </p>
                  <hr className="border-gray-200 my-2" />
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>

                {authUser.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="flex items-center text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Add Problem
                    </Link>
                  </li>
                )}

                <li>
                  <LogoutButton className="w-full flex items-center text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          ) : (
            // ❌ Not logged in: Show Login & Signup
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
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
