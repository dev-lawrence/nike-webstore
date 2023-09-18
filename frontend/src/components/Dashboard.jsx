import { useClerk } from '@clerk/clerk-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useClerk();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="dashboard">
      {user && (
        <div className="dropdown" onClick={toggleDropdown}>
          <img src={user.imageUrl} alt="avatar" className="avatar" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/dashboard" className="dropdown-item">
                Orders
              </Link>
              <Link to="/favorite" className="dropdown-item">
                Favorites
              </Link>
              <button
                className="dropdown-item-button"
                onClick={() => {
                  toggleDropdown();
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;