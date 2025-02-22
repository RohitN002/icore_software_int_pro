import { useState } from "react";
import { CgProfile } from "react-icons/cg";
export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">User Management</div>
      <div className="relative">
        {/* <img
        src={CgProfile}
          alt="Profile"
          
        /> */}
        <CgProfile
          className="w-10 h-10 rounded-full text-white cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        />
        {showLogout && (
          <div
            className="absolute right-0 mt-2 bg-white text-black py-2 px-4 rounded shadow-md cursor-pointer"
            onClick={() => alert("Logged out")}
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  );
}
