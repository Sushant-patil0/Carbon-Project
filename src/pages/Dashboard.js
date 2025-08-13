import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Target, 
  Calendar,
  Activity,
  Award,
  Users
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30'); // days
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Fetch user's carbon footprint data
  const { data: footprintData, isLoading: footprintLoading } = useQuery(
    ['footprint', timeRange],
    async () => {
      const endDate = new Date();
      const startDate = subDays(endDate, parseInt(timeRange));
      
      const response = await axios.get(`/api/activities/stats/summary`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      return response.data;
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
      staleTime: 300000
    }
  );

  // Fetch recent activities
  const { data: recentActivities, isLoading: activitiesLoading } = useQuery(
    ['recent-activities'],
    async () => {
      const response = await axios.get('/api/activities', {
        params: { limit: 5, sortBy: 'date', sortOrder: 'desc' }
      });
      return response.data.activities;
    }
  );

  // Fetch challenges
  const { data: challenges, isLoading: challengesLoading } = useQuery(
    ['user-challenges'],
    async () => {
      const response = await axios.get('/api/challenges/user');
      return response.data;
    }
  );

  // Generate sample data for charts (replace with real data)
  const generateChartData = (days) => {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: format(date, 'MMM dd'),
        emissions: Math.random() * 20 + 5, // Random emissions between 5-25 kg CO2e
        target: 15 // Daily target
      });
    }
    return data;
  };

  const chartData = generateChartData(parseInt(timeRange));

  // Colors for pie chart
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Calculate progress towards goals
  const calculateProgress = () => {
    if (!footprintData) return { current: 0, target: 100, percentage: 0 };
    
    const target = 100; // Monthly target in kg CO2e
    const current = footprintData.totalEmissions;
    const percentage = Math.min((current / target) * 100, 100);
    
    return { current, target, percentage };
  };

  const progress = calculateProgress();

  // Quick action cards
  const quickActions = [
    {
      title: 'Add Activity',
      description: 'Log a new carbon-emitting activity',
      icon: Activity,
      color: 'bg-primary-500',
      href: '/add-activity'
    },
    {
      title: 'View Reports',
      description: 'Generate detailed carbon footprint reports',
      icon: Target,
      color: 'bg-carbon-500',
      href: '/reports'
    },
    {
      title: 'Join Challenge',
      description: 'Participate in eco-challenges',
      icon: Award,
      color: 'bg-success-500',
      href: '/challenges'
    },
    {
      title: 'Community',
      description: 'Connect with other eco-conscious users',
      icon: Users,
      color: 'bg-warning-500',
      href: '/community'
    }
  ];

  if (footprintLoading || activitiesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-carbon-900">
            Welcome back, {user?.profile?.firstName || user?.username}!
          </h1>
          <p className="text-carbon-600 mt-2">
            Track your carbon footprint and make a positive impact on the environment.
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-carbon-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Leaf className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-carbon-600">Total Emissions</p>
              <p className="text-2xl font-bold text-carbon-900">
                {footprintData?.totalEmissions?.toFixed(1) || '0'} kg CO₂e
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              {progress.percentage > 100 ? (
                <TrendingUp className="h-4 w-4 text-danger-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-success-500 mr-1" />
              )}
              <span className={progress.percentage > 100 ? 'text-danger-600' : 'text-success-600'}>
                {progress.percentage > 100 ? 'Above target' : 'On track'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-2 bg-carbon-100 rounded-lg">
              <Target className="h-6 w-6 text-carbon-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-carbon-600">Monthly Goal</p>
              <p className="text-2xl font-bold text-carbon-900">
                {progress.percentage.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-carbon-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  progress.percentage > 100 ? 'bg-danger-500' : 'bg-primary-500'
                }`}
                style={{ width: `${Math.min(progress.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <Calendar className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-carbon-600">Streak</p>
              <p className="text-2xl font-bold text-carbon-900">
                {user?.stats?.streakDays || 0} days
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-carbon-600">
              Keep up the great work!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-carbon-600">Activities</p>
              <p className="text-2xl font-bold text-carbon-900">
                {footprintData?.activityCount || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-carbon-600">
              This period
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Trend Chart */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-carbon-900 mb-4">Emissions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Chart */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-carbon-900 mb-4">Category Breakdown</h3>
          {footprintData?.categoryBreakdown && footprintData.categoryBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={footprintData.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="emissions"
                >
                  {footprintData.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-carbon-500">
              <p>No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-carbon-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="group p-4 rounded-lg border border-carbon-200 hover:border-primary-300 hover:shadow-medium transition-all duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-carbon-900 group-hover:text-primary-600 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-carbon-600 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-carbon-900 mb-4">Recent Activities</h3>
        {recentActivities && recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity._id} className="flex items-center justify-between p-3 rounded-lg bg-carbon-50">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Activity className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-carbon-900">{activity.title}</p>
                    <p className="text-sm text-carbon-600">
                      {format(new Date(activity.date), 'MMM dd, yyyy')} • {activity.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-carbon-900">
                    {activity.totalEmissions.toFixed(2)} kg CO₂e
                  </p>
                  <p className="text-sm text-carbon-600">
                    {activity.quantity} {activity.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-carbon-500">
            <Activity className="h-12 w-12 mx-auto mb-3 text-carbon-300" />
            <p>No activities yet. Start tracking your carbon footprint!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 