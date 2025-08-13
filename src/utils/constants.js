// Application constants
export const APP_NAME = 'Carbon Footprint Tracker';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  USERS: {
    PROFILE: '/users/profile',
    STATS: '/users/stats',
    LEADERBOARD: '/users/leaderboard',
  },
  ACTIVITIES: {
    BASE: '/activities',
    CREATE: '/activities',
    UPDATE: (id) => `/activities/${id}`,
    DELETE: (id) => `/activities/${id}`,
  },
  CARBON: {
    FACTORS: '/carbon/factors',
    CALCULATE: '/carbon/calculate',
    OFFSET_OPTIONS: '/carbon/offset-options',
    OFFSET_COST: '/carbon/offset-cost',
  },
  CHALLENGES: {
    BASE: '/challenges',
    CREATE: '/challenges',
    JOIN: (id) => `/challenges/${id}/join`,
    PROGRESS: (id) => `/challenges/${id}/progress`,
    LEAVE: (id) => `/challenges/${id}/leave`,
    USER_CHALLENGES: '/challenges/user/me',
  },
  ADMIN: {
    USERS: '/admin/users',
    USER: (id) => `/admin/users/${id}`,
    USER_ROLE: (id) => `/admin/users/${id}/role`,
    STATS: '/admin/stats',
    RECENT_ACTIVITIES: '/admin/recent-activities',
  },
};

// Activity categories
export const ACTIVITY_CATEGORIES = {
  TRANSPORTATION: 'transportation',
  ENERGY: 'energy',
  FOOD: 'food',
  WASTE: 'waste',
  WATER: 'water',
  TRAVEL: 'travel',
  SHOPPING: 'shopping',
  OTHER: 'other',
};

export const ACTIVITY_CATEGORY_LABELS = {
  [ACTIVITY_CATEGORIES.TRANSPORTATION]: 'Transportation',
  [ACTIVITY_CATEGORIES.ENERGY]: 'Energy',
  [ACTIVITY_CATEGORIES.FOOD]: 'Food',
  [ACTIVITY_CATEGORIES.WASTE]: 'Waste',
  [ACTIVITY_CATEGORIES.WATER]: 'Water',
  [ACTIVITY_CATEGORIES.TRAVEL]: 'Travel',
  [ACTIVITY_CATEGORIES.SHOPPING]: 'Shopping',
  [ACTIVITY_CATEGORIES.OTHER]: 'Other',
};

// Transportation subcategories
export const TRANSPORTATION_SUBCATEGORIES = {
  CAR: 'car',
  BUS: 'bus',
  TRAIN: 'train',
  PLANE: 'plane',
  MOTORCYCLE: 'motorcycle',
  BICYCLE: 'bicycle',
  WALKING: 'walking',
  ELECTRIC_VEHICLE: 'electric_vehicle',
};

// Energy subcategories
export const ENERGY_SUBCATEGORIES = {
  ELECTRICITY: 'electricity',
  NATURAL_GAS: 'natural_gas',
  HEATING_OIL: 'heating_oil',
  PROPANE: 'propane',
  SOLAR: 'solar',
  WIND: 'wind',
};

// Units
export const UNITS = {
  DISTANCE: {
    KM: 'km',
    MILES: 'miles',
    METERS: 'm',
  },
  WEIGHT: {
    KG: 'kg',
    LBS: 'lbs',
    GRAMS: 'g',
  },
  VOLUME: {
    LITERS: 'L',
    GALLONS: 'gal',
    CUBIC_METERS: 'm³',
  },
  ENERGY: {
    KWH: 'kWh',
    MJ: 'MJ',
    BTU: 'BTU',
  },
  TIME: {
    HOURS: 'hours',
    MINUTES: 'minutes',
    DAYS: 'days',
  },
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: 'User',
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.MODERATOR]: 'Moderator',
};

// Challenge types
export const CHALLENGE_TYPES = {
  REDUCTION: 'reduction',
  OFFSET: 'offset',
  AWARENESS: 'awareness',
  COMMUNITY: 'community',
};

export const CHALLENGE_TYPE_LABELS = {
  [CHALLENGE_TYPES.REDUCTION]: 'Emission Reduction',
  [CHALLENGE_TYPES.OFFSET]: 'Carbon Offset',
  [CHALLENGE_TYPES.AWARENESS]: 'Awareness',
  [CHALLENGE_TYPES.COMMUNITY]: 'Community',
};

// Challenge difficulty levels
export const CHALLENGE_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  EXPERT: 'expert',
};

export const CHALLENGE_DIFFICULTY_LABELS = {
  [CHALLENGE_DIFFICULTY.EASY]: 'Easy',
  [CHALLENGE_DIFFICULTY.MEDIUM]: 'Medium',
  [CHALLENGE_DIFFICULTY.HARD]: 'Hard',
  [CHALLENGE_DIFFICULTY.EXPERT]: 'Expert',
};

// Time periods
export const TIME_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  CUSTOM: 'custom',
};

export const TIME_PERIOD_LABELS = {
  [TIME_PERIODS.TODAY]: 'Today',
  [TIME_PERIODS.WEEK]: 'This Week',
  [TIME_PERIODS.MONTH]: 'This Month',
  [TIME_PERIODS.YEAR]: 'This Year',
  [TIME_PERIODS.CUSTOM]: 'Custom Range',
};

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  LIGHT: '#f1f5f9',
  DARK: '#1e293b',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
};

// Validation rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  EMAIL_MAX_LENGTH: 254,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  MAX_FILES: 5,
};

// Carbon offset options
export const CARBON_OFFSET_OPTIONS = {
  TREE_PLANTING: 'tree_planting',
  RENEWABLE_ENERGY: 'renewable_energy',
  FOREST_CONSERVATION: 'forest_conservation',
  OCEAN_CONSERVATION: 'ocean_conservation',
  CLEAN_COOKSTOVES: 'clean_cookstoves',
  SOLAR_PANELS: 'solar_panels',
};

export const CARBON_OFFSET_LABELS = {
  [CARBON_OFFSET_OPTIONS.TREE_PLANTING]: 'Tree Planting',
  [CARBON_OFFSET_OPTIONS.RENEWABLE_ENERGY]: 'Renewable Energy',
  [CARBON_OFFSET_OPTIONS.FOREST_CONSERVATION]: 'Forest Conservation',
  [CARBON_OFFSET_OPTIONS.OCEAN_CONSERVATION]: 'Ocean Conservation',
  [CARBON_OFFSET_OPTIONS.CLEAN_COOKSTOVES]: 'Clean Cookstoves',
  [CARBON_OFFSET_OPTIONS.SOLAR_PANELS]: 'Solar Panels',
};
