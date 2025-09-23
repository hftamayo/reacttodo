/**
 * Jest setup file for API helpers tests
 */

import 'jest-dom/extend-expect';

// Mock global fetch
global.fetch = jest.fn();

// Mock AbortController
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: {},
})) as any;

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as any;

// Mock performance.now
Object.defineProperty(performance, 'now', {
  value: jest.fn(() => Date.now()),
  writable: true,
});

// Suppress console methods in tests unless explicitly needed
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
  
  // Reset console methods
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  console.log = originalConsoleLog;
});

afterEach(() => {
  // Clean up after each test
  jest.clearAllMocks();
});
