import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div className="p-4">
      {/* <ul className="flex justify-around list-none text-2xl">
        <li className="nav-item">
          <Link to="articles" className="text-blue-500 hover:text-blue-700">
            Articles
          </Link>
        </li>
      </ul> */}
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
