import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Activity, Calculator, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const AddActivity = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    activityType: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: ''
  });

  const [emissionFactors, setEmissionFactors] = useState([]);
  const [calculatedEmissions, setCalculatedEmissions] = useState(null);

  const activityTypes = [
    { value: 'transport', label: 'Transportation', units: ['km', 'miles'] },
    { value: 'energy', label: 'Energy Usage', units: ['kWh', 'therms'] },
    { value: 'waste', label: 'Waste', units: ['kg', 'lbs'] },
    { value: 'food', label: 'Food', units: ['kg', 'lbs'] },
    { value: 'shopping', label: 'Shopping', units: ['dollars', 'euros'] }
  ];

  const categories = [
    'Personal',
    'Work',
    'Travel',
    'Home',
    'Entertainment',
    'Other'
  ];

  useEffect(() => {
    // Simulate fetching emission factors
    const mockFactors = [
      { activityType: 'transport', unit: 'km', factor: 0.2 },
      { activityType: 'energy', unit: 'kWh', factor: 0.5 },
      { activityType: 'waste', unit: 'kg', factor: 2.5 },
      { activityType: 'food', unit: 'kg', factor: 1.8 },
      { activityType: 'shopping', unit: 'dollars', factor: 0.1 }
    ];
    setEmissionFactors(mockFactors);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate emissions when type, value, and unit are filled
    if (name === 'value' || name === 'activityType' || name === 'unit') {
      calculateEmissions();
    }
  };

  const calculateEmissions = () => {
    const { activityType, value, unit } = formData;
    if (activityType && value && unit) {
      const factor = emissionFactors.find(f => 
        f.activityType === activityType && f.unit === unit
      );
      
      if (factor) {
        const emissions = parseFloat(value) * factor.factor;
        setCalculatedEmissions({
          value: emissions,
          unit: 'kg CO2e',
          factor: factor.factor
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.activityType || !formData.value || !formData.unit) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!calculatedEmissions) {
      toast.error('Please check your input values');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Activity added successfully!');
      navigate('/activities');
    } catch (error) {
      toast.error('Failed to add activity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUnitsForType = (type) => {
    const activity = activityTypes.find(a => a.value === type);
    return activity ? activity.units : [];
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Activity
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your carbon footprint by adding daily activities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Activity Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Activity Type *
          </label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select activity type</option>
            {activityTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Value and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Value *
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit *
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
              disabled={!formData.activityType}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
            >
              <option value="">Select unit</option>
              {formData.activityType && getUnitsForType(formData.activityType).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Optional description of the activity..."
          />
        </div>

        {/* Calculated Emissions Display */}
        {calculatedEmissions && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Estimated Carbon Footprint:
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold text-green-900 dark:text-green-100">
              {calculatedEmissions.value.toFixed(2)} {calculatedEmissions.unit}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Factor: {calculatedEmissions.factor} kg CO2e per {formData.unit}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/activities')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !calculatedEmissions}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add Activity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddActivity; 