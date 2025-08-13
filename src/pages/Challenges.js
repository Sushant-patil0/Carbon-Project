import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, Target, Award, TrendingUp, Plus, UserPlus, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    fetchChallenges();
    fetchUserChallenges();
  }, []);

  const fetchChallenges = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockChallenges = [
        {
          id: 1,
          title: 'Zero Car Week',
          description: 'Go an entire week without using a car. Use public transport, bike, or walk instead.',
          category: 'Transport',
          goal: 7,
          duration: 7,
          reward: 'Eco Warrior Badge',
          participants: 156,
          maxParticipants: 200,
          startDate: '2024-01-15',
          endDate: '2024-01-22',
          isActive: true,
          difficulty: 'Medium'
        },
        {
          id: 2,
          title: 'Energy Saver',
          description: 'Reduce your daily energy consumption by 20% for one month.',
          category: 'Energy',
          goal: 30,
          duration: 30,
          reward: 'Energy Master Badge',
          participants: 89,
          maxParticipants: 150,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          isActive: true,
          difficulty: 'Hard'
        },
        {
          id: 3,
          title: 'Waste Free Living',
          description: 'Minimize waste production and practice proper recycling for two weeks.',
          category: 'Waste',
          goal: 14,
          duration: 14,
          reward: 'Recycling Champion Badge',
          participants: 234,
          maxParticipants: 300,
          startDate: '2024-01-10',
          endDate: '2024-01-24',
          isActive: true,
          difficulty: 'Easy'
        }
      ];
      
      setChallenges(mockChallenges);
    } catch (error) {
      toast.error('Failed to fetch challenges');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserChallenges = async () => {
    try {
      // Mock user challenges data
      const mockUserChallenges = [
        {
          id: 1,
          title: 'Zero Car Week',
          progress: 5,
          goal: 7,
          joinedAt: '2024-01-15',
          isCompleted: false
        },
        {
          id: 3,
          title: 'Waste Free Living',
          progress: 14,
          goal: 14,
          joinedAt: '2024-01-10',
          isCompleted: true,
          completedAt: '2024-01-24'
        }
      ];
      
      setUserChallenges(mockUserChallenges);
    } catch (error) {
      console.error('Failed to fetch user challenges:', error);
    }
  };

  const joinChallenge = async (challengeId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Successfully joined challenge!');
      fetchUserChallenges(); // Refresh user challenges
    } catch (error) {
      toast.error('Failed to join challenge');
    }
  };

  const leaveChallenge = async (challengeId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Left challenge successfully');
      fetchUserChallenges(); // Refresh user challenges
    } catch (error) {
      toast.error('Failed to leave challenge');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getProgressPercentage = (progress, goal) => {
    return Math.min((progress / goal) * 100, 100);
  };

  const isUserParticipating = (challengeId) => {
    return userChallenges.some(uc => uc.id === challengeId);
  };

  const getUserChallenge = (challengeId) => {
    return userChallenges.find(uc => uc.id === challengeId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sustainability Challenges
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join challenges to reduce your carbon footprint and compete with others
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Available Challenges
          </button>
          <button
            onClick={() => setActiveTab('my-challenges')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-challenges'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Challenges
          </button>
        </nav>
      </div>

      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const isParticipating = isUserParticipating(challenge.id);
            const userChallenge = getUserChallenge(challenge.id);
            
            return (
              <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {challenge.description}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Target className="h-4 w-4 mr-2" />
                      Goal: {challenge.goal} days
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Duration: {challenge.duration} days
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {challenge.participants}/{challenge.maxParticipants} participants
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Award className="h-4 w-4 mr-2" />
                      Reward: {challenge.reward}
                    </div>
                  </div>

                  {isParticipating && userChallenge && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {userChallenge.progress}/{userChallenge.goal} days
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(userChallenge.progress, userChallenge.goal)}%` }}
                        />
                      </div>
                      {userChallenge.isCompleted && (
                        <div className="flex items-center text-green-600 dark:text-green-400 mt-2">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Completed!</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {!isParticipating ? (
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Challenge
                      </button>
                    ) : (
                      <button
                        onClick={() => leaveChallenge(challenge.id)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Leave Challenge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'my-challenges' && (
        <div className="space-y-6">
          {userChallenges.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No challenges joined</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Join some challenges to start tracking your progress.
              </p>
            </div>
          ) : (
            userChallenges.map((userChallenge) => {
              const challenge = challenges.find(c => c.id === userChallenge.id);
              if (!challenge) return null;

              return (
                <div key={userChallenge.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {userChallenge.progress}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Days Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {challenge.goal}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Goal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {getProgressPercentage(userChallenge.progress, userChallenge.goal).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress Bar</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {userChallenge.progress}/{userChallenge.goal} days
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          userChallenge.isCompleted ? 'bg-green-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${getProgressPercentage(userChallenge.progress, userChallenge.goal)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Joined: {new Date(userChallenge.joinedAt).toLocaleDateString()}</span>
                    {userChallenge.isCompleted && (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Completed on {new Date(userChallenge.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {!userChallenge.isCompleted && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => leaveChallenge(challenge.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Leave Challenge
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Challenges; 