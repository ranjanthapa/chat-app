import React from "react";

interface SidebarProps {
  onUpdateProfile: () => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onUpdateProfile,
  onDeleteAccount,
  onLogout,
}) => {
  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      <div className="p-5 border-b text-lg font-bold bg-blue-600 text-white">
        User Menu
      </div>

      <div className="flex flex-col p-4 space-y-3">
        <button
          onClick={onUpdateProfile}
          className="p-3 rounded-lg hover:bg-gray-300 text-left"
        >
          Update Profile
        </button>

        <button
          onClick={onDeleteAccount}
          className="p-3 rounded-lg hover:bg-gray-300 text-left"
        >
          Delete Account
        </button>

        <button
          onClick={onLogout}
          className="p-3 rounded-lg hover:bg-gray-300 text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
