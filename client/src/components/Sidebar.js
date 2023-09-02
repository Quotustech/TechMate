import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen row-span-5 ">
      <nav className="bg-gray-800 w-full text-white p-4 flex flex-col justify-between ">
        <ul>
          <li className="mb-4">
            <a href="#" className="block p-2">
              Item 1
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block p-2">
              Item 2
            </a>
          </li>
          <li>
            <a href="#" className="block p-2">
              Item 3
            </a>
          </li>
        </ul>
        <div className="flex  p-4 border">
          <button className=" text-white text-xl flex items-center justify-center ">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
