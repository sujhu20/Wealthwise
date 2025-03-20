// Enhanced analytics implementation for finance app
import React from 'react';

// Configuration 
const config = {
  // Enable/disable analytics in development
  debugMode: process.env.NODE_ENV === 'development',
  // App name for segmentation
  appName: 'WealthWise',
  // Default tracking options
  defaultOptions: {
    // Track timestamps by default
    addTimestamp: true
  }
};

// Initialize Google Analytics 
export const initGA = (measurementId) => {
  if (config.debugMode) {
    console.log(`Analytics initialized for ${config.appName}`);
    return true;
  }
  
  // Here you would initialize actual GA service
  // This is where you'd put real implementation when ready
  try {
    // Placeholder for real GA implementation
    console.log(`GA initialized with ID: ${measurementId || 'not provided'}`);
    return true;
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
    return false;
  }
};

// Enhanced page view tracking with path and title
export const logPageView = (path, title) => {
  const pagePath = path || (window?.location?.pathname || 'unknown');
  const pageTitle = title || document?.title || 'Unknown Page';
  
  if (config.debugMode) {
    console.log(`Page viewed: ${pageTitle} (${pagePath})`);
  }
  
  // Track page view details
  analytics.page({
    path: pagePath,
    title: pageTitle,
    timestamp: new Date().toISOString()
  });
  
  return { path: pagePath, title: pageTitle };
};

// Enhanced event tracking with category, action, label, value
export const trackEvent = (category, action, label, value, options = {}) => {
  const eventData = {
    category: category || 'General',
    action: action || 'Interaction',
    label: label || undefined,
    value: typeof value === 'number' ? value : undefined,
    ...(config.defaultOptions.addTimestamp && { timestamp: new Date().toISOString() }),
    ...options
  };
  
  if (config.debugMode) {
    console.log('Event tracked:', eventData);
  }
  
  // Track the event
  analytics.track('event', eventData);
  
  return eventData;
};

// Finance-specific tracking methods
export const trackFinancialAction = (actionType, amount, details = {}) => {
  return trackEvent(
    'Financial',
    actionType,
    details.description,
    amount,
    {
      ...details,
      currencyCode: details.currencyCode || 'USD'
    }
  );
};

// Track investment actions specifically
export const trackInvestment = (actionType, investment) => {
  return trackFinancialAction(
    actionType,
    investment.value,
    {
      description: investment.name,
      category: investment.category,
      impactScore: investment.impactScore,
      performance: investment.performance,
      id: investment.id
    }
  );
};

// Track user engagement duration
let sessionStartTime = null;
export const startTrackingSession = () => {
  sessionStartTime = new Date();
  return sessionStartTime;
};

export const endTrackingSession = (category = 'User Session') => {
  if (!sessionStartTime) return null;
  
  const sessionEndTime = new Date();
  const durationMs = sessionEndTime - sessionStartTime;
  const durationSeconds = Math.floor(durationMs / 1000);
  
  trackEvent(category, 'Session Duration', null, durationSeconds, {
    startTime: sessionStartTime.toISOString(),
    endTime: sessionEndTime.toISOString(),
    durationMs
  });
  
  sessionStartTime = null;
  return durationSeconds;
};

// Track page view with alternate signature (for compatibility)
export const trackPageView = logPageView;

// Analytics wrapper component with timing capabilities
export const AnalyticsWrapper = ({ children, trackingId, pageInfo }) => {
  React.useEffect(() => {
    if (trackingId) {
      initGA(trackingId);
    }
    
    startTrackingSession();
    
    if (pageInfo) {
      logPageView(pageInfo.path, pageInfo.title);
    } else {
      logPageView();
    }
    
    return () => {
      endTrackingSession();
    };
  }, [trackingId, pageInfo]);
  
  return children;
};

// Enhanced analytics object with more methods
const analytics = {
  track: (event, data) => {
    if (config.debugMode) {
      console.log(`Analytics track: ${event}`, data);
    }
    // In real implementation, send data to analytics service
  },
  
  page: (data) => {
    if (config.debugMode) {
      console.log('Analytics page view:', data);
    }
    // In real implementation, send page view to analytics service
  },
  
  identify: (userId, traits = {}) => {
    if (config.debugMode) {
      console.log(`Analytics identify user: ${userId}`, traits);
    }
    // In real implementation, identify user in analytics service
  },
  
  setConfig: (newConfig) => {
    Object.assign(config, newConfig);
    return config;
  },
  
  getConfig: () => {
    return { ...config };
  }
};

export default analytics; 