import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Plus, 
  Target, 
  Award, 
  BarChart3, 
  Users, 
  Settings,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Activities',
      href: '/activities',
      icon: Activity,
      current: location.pathname === '/activities'
    },
    {
      name: 'Add Activity',
      href: '/add-activity',
      icon: Plus,
      current: location.pathname === '/add-activity'
    },
    {
      name: 'Challenges',
      href: '/challenges',
      icon: Award,
      current: location.pathname === '/challenges'
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: BarChart3,
      current: location.pathname === '/reports'
    },
    {
      name: 'Community',
      href: '/community',
      icon: Users,
      current: location.pathname === '/community'
    }
  ];

  // Admin-only navigation items
  const adminNavigation = [
    {
      name: 'Admin Panel',
      href: '/admin',
      icon: Settings,
      current: location.pathname === '/admin'
    }
  ];

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === href;
  };

  return (
    <div className={`bg-white shadow-soft border-r border-carbon-100 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-carbon-400 hover:text-carbon-600 hover:bg-carbon-100 transition-colors"
        >
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                      : 'text-carbon-600 hover:bg-carbon-50 hover:text-carbon-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    isActive(item.href) ? 'text-primary-600' : 'text-carbon-400 group-hover:text-carbon-600'
                  }`} />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}

          {/* Admin Navigation */}
          {user && (user.role === 'admin' || user.role === 'super_admin') && (
            <>
              <div className="pt-4">
                <div className="border-t border-carbon-200" />
              </div>
              <div className="pt-2">
                <h3 className={`px-3 text-xs font-semibold text-carbon-400 uppercase tracking-wider ${
                  isCollapsed ? 'sr-only' : ''
                }`}>
                  Admin
                </h3>
              </div>
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-warning-100 text-warning-700 border-r-2 border-warning-500'
                          : 'text-carbon-600 hover:bg-carbon-50 hover:text-carbon-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                        isActive(item.href) ? 'text-warning-600' : 'text-carbon-400 group-hover:text-carbon-600'
                      }`} />
                      {!isCollapsed && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </nav>

      {/* Quick Stats (when not collapsed) */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="bg-carbon-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Leaf className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-sm font-medium text-carbon-900">Quick Stats</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-carbon-600">Today's Goal:</span>
                <span className="font-medium text-carbon-900">75%</span>
              </div>
              <div className="w-full bg-carbon-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-carbon-600">Weekly Streak:</span>
                <span className="font-medium text-carbon-900">{user?.stats?.streakDays || 0} days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Quick Stats */}
      {isCollapsed && (
        <div className="px-2 pb-4">
          <div className="bg-carbon-50 rounded-lg p-2">
            <div className="flex flex-col items-center">
              <Leaf className="h-5 w-5 text-primary-600 mb-2" />
              <div className="w-full bg-carbon-200 rounded-full h-2 mb-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs font-medium text-carbon-900">75%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 