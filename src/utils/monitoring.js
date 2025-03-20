import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initializeMonitoring = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: process.env.REACT_APP_ENV || 'production'
  });
};

export const captureError = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context
  });
};

export const setUserContext = (user) => {
  Sentry.setUser(user);
};

export const startTransaction = (name, op) => {
  return Sentry.startTransaction({
    name,
    op
  });
};

export default {
  initializeMonitoring,
  captureError,
  setUserContext,
  startTransaction
}; 