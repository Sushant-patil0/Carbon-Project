import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, Share, TrendingUp, Award, Users2, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await Promise.all([
        fetchPosts(),
        fetchLeaderboard()
      ]);
    } catch (error) {
      toast.error('Failed to fetch community data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    // Mock community posts data
    const mockPosts = [
      {
        id: 1,
        user: {
          name: 'Eco Warrior Sarah',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          level: 'Gold'
        },
        content: 'Just completed my 30-day zero-waste challenge! 🎉 It was challenging but so rewarding. Here are my top tips: 1) Use reusable containers 2) Shop at bulk stores 3) Compost food scraps. What challenges are you working on?',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        likes: 24,
        comments: 8,
        shares: 3,
        timestamp: '2024-01-22T10:30:00Z',
        category: 'Achievement'
      },
      {
        id: 2,
        user: {
          name: 'Green Living Mike',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          level: 'Silver'
        },
        content: 'Switched to solar panels last month and my electricity bill dropped by 80%! 🌞 The installation was smooth and the savings are incredible. Highly recommend for anyone considering renewable energy.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
        likes: 18,
        comments: 12,
        shares: 5,
        timestamp: '2024-01-22T09:15:00Z',
        category: 'Energy'
      },
      {
        id: 3,
        user: {
          name: 'Sustainable Jane',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          level: 'Bronze'
        },
        content: 'Started a community garden in my neighborhood! 🌱 We\'re growing organic vegetables and sharing the harvest. It\'s amazing how much you can grow in small spaces. Anyone else doing community gardening?',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
        likes: 31,
        comments: 15,
        shares: 7,
        timestamp: '2024-01-22T08:45:00Z',
        category: 'Community'
      }
    ];
    
    setPosts(mockPosts);
  };

  const fetchLeaderboard = async () => {
    // Mock leaderboard data
    const mockLeaderboard = [
      { rank: 1, name: 'Eco Master Alex', emissions: 45.2, level: 'Diamond', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Green Queen Maria', emissions: 52.8, level: 'Platinum', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Sustainability Sam', emissions: 58.1, level: 'Gold', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
      { rank: 4, name: 'Eco Warrior Sarah', emissions: 62.3, level: 'Gold', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
      { rank: 5, name: 'Green Living Mike', emissions: 67.9, level: 'Silver', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
    ];
    
    setLeaderboard(mockLeaderboard);
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    toast.success('Post liked!');
  };

  const handleComment = (postId) => {
    // In real app, this would open a comment modal
    toast.success('Comment feature coming soon!');
  };

  const handleShare = (postId) => {
    // In real app, this would open share options
    toast.success('Post shared!');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Diamond': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20';
      case 'Platinum': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
      case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Silver': return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
      case 'Bronze': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20';
      default: return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Achievement': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Energy': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'Community': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with fellow eco-warriors, share achievements, and get inspired
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('feed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'feed'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Community Feed
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'leaderboard'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'groups'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Groups
          </button>
        </nav>
      </div>

      {/* Community Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Create Post */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start space-x-4">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Your avatar"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Share your sustainability journey, achievements, or tips with the community..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      📷
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      🏷️
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={post.user.avatar}
                        alt={post.user.name}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {post.user.name}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(post.user.level)}`}>
                            {post.user.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => handleComment(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      >
                        <Share className="h-5 w-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Eco Warriors
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                <span>Lowest emissions win!</span>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      {user.rank}
                    </div>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                        {user.level}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {user.emissions} kg CO2e
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Ranking */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Ranking
            </h3>
            <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm">
                  15
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">You</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Keep going!</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  156.8 kg CO2e
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sustainability Groups
              </h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Group
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Group Cards */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Users2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Zero Waste Warriors</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1.2k members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  A community dedicated to reducing waste and living sustainably.
                </p>
                <button className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Join Group
                </button>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Renewable Energy</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">856 members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Discussing solar, wind, and other renewable energy solutions.
                </p>
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Join Group
                </button>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Eco Challenges</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2.1k members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Join challenges and compete with others to reduce your footprint.
                </p>
                <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
