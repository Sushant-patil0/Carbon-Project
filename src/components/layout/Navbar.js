import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Leaf,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserMenuOpen(false);
  };

  // Sample notifications (replace with real data)
  const notifications = [
    {
      id: 1,
      title: 'Weekly Goal Achieved!',
      message: 'Congratulations! You\'ve met your weekly carbon reduction goal.',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'New Challenge Available',
      message: 'Join the "Zero Waste Week" challenge starting tomorrow.',
      time: '1 day ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Monthly Report Ready',
      message: 'Your January carbon footprint report is now available.',
      time: '3 days ago',
      type: 'info',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-soft border-b border-carbon-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-carbon-900">Carbon Tracker</h1>
              </div>
            </Link>
          </div>

          {/* Center - Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-carbon-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities, reports..."
                className="block w-full pl-10 pr-3 py-2 border border-carbon-300 rounded-lg text-carbon-900 placeholder-carbon-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - User Menu and Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-lg text-carbon-400 hover:text-carbon-600 hover:bg-carbon-100 transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-strong border border-carbon-200 z-50">
                  <div className="p-4 border-b border-carbon-200">
                    <h3 className="text-lg font-semibold text-carbon-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-carbon-100 hover:bg-carbon-50 transition-colors ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                              notification.type === 'success' ? 'bg-success-500' : 'bg-info-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-carbon-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-carbon-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-carbon-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-carbon-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-carbon-300" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-carbon-200">
                    <Link
                      to="/notifications"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-3 p-2 rounded-lg text-carbon-600 hover:text-carbon-900 hover:bg-carbon-100 transition-colors"
              >
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  {user?.profile?.avatar ? (
                    <img
                      src={user.profile.avatar}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary-600" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-carbon-900">
                    {user?.profile?.firstName || user?.username}
                  </p>
                  <p className="text-xs text-carbon-500 capitalize">
                    {user?.role}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-carbon-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-carbon-200 z-50">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-carbon-700 hover:bg-carbon-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-carbon-700 hover:bg-carbon-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <hr className="my-1 border-carbon-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-carbon-700 hover:bg-carbon-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-carbon-400 hover:text-carbon-600 hover:bg-carbon-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-carbon-200 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-carbon-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities, reports..."
              className="block w-full pl-10 pr-3 py-2 border border-carbon-300 rounded-lg text-carbon-900 placeholder-carbon-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 