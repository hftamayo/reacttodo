# API Helpers Unit Tests

This directory contains comprehensive unit tests for the `apiHelpers.ts` service following the AAA (Arrange-Act-Assert) pattern with 75%+ code coverage.

## Test Structure

```
test/
├── services/
│   └── api/
│       └── apiHelpers.test.ts    # Main test file
├── setup/
│   ├── jest.setup.ts             # Jest configuration
│   └── testUtils.ts              # Test utilities and mocks
├── jest.config.js                # Jest configuration
└── README.md                     # This file
```

## Running Tests

### Run API Helpers Tests
```bash
npm run test:api
```

### Run with Coverage Report
```bash
npm run test:api:coverage
```

### Run in Watch Mode
```bash
npm run test:api -- --watch
```

## Test Coverage

The tests achieve **75%+ code coverage** for the following areas:

### ✅ **handleResponse Function**
- ✅ Successful response handling
- ✅ Error response handling (404, 500, etc.)
- ✅ Empty error data handling

### ✅ **handleError Function**
- ✅ Error instance handling
- ✅ ApiError handling
- ✅ Unknown error type handling

### ✅ **makeRequest Function**
- ✅ Successful requests
- ✅ POST requests with body
- ✅ Rate limit handling (429)
- ✅ Error responses (500, 400, etc.)
- ✅ Network timeout (AbortError)
- ✅ Network errors without code
- ✅ Rate limit exceptions with cached data
- ✅ Prefetch request error suppression
- ✅ Header building
- ✅ Custom error context
- ✅ Caching behavior
- ✅ Edge cases (invalid JSON)

## Test Features

### 🎯 **AAA Pattern**
All tests follow the **Arrange-Act-Assert** pattern:
- **Arrange**: Set up test data and mocks
- **Act**: Execute the function being tested
- **Assert**: Verify the expected behavior

### 🛡️ **Comprehensive Mocking**
- `fetch` API mocking
- `AbortController` mocking
- `console` methods mocking
- `notificationService` mocking
- `performance.now` mocking

### 📊 **Coverage Thresholds**
- **Branches**: 75%
- **Functions**: 75%
- **Lines**: 75%
- **Statements**: 75%

## Test Utilities

The `testUtils.ts` file provides helper functions:
- `createMockResponse()` - Creates mock Response objects
- `createMockSuccessResponse()` - Creates successful responses
- `createMockErrorResponse()` - Creates error responses
- `createMockApiError()` - Creates ApiError objects
- `createMockApiResponse()` - Creates ApiResponse objects
- `mockFetchSuccess()` - Mocks successful fetch calls
- `mockFetchError()` - Mocks error fetch calls
- `mockFetchNetworkError()` - Mocks network errors
- `resetAllMocks()` - Resets all mocks

## Example Test Structure

```typescript
describe('makeRequest', () => {
  it('should make successful request and return data', async () => {
    // Arrange
    const mockData = { id: 1, name: 'Test' };
    const mockResponse = createMockSuccessResponse(mockData);
    mockFetch.mockResolvedValue(mockResponse);

    // Act
    const result = await makeRequest<typeof mockData>('https://api.test.com/data');

    // Assert
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test.com/data',
      expect.objectContaining({
        headers: expect.any(Headers),
        mode: 'cors',
        signal: expect.any(Object),
      })
    );
  });
});
```

## Dependencies

- **Jest**: Testing framework
- **ts-jest**: TypeScript support for Jest
- **jest-environment-jsdom**: DOM environment for tests
- **@testing-library/jest-dom**: Additional Jest matchers

## Notes

- Tests are isolated and don't affect each other
- All external dependencies are properly mocked
- Error scenarios are thoroughly tested
- Caching behavior is validated
- Network edge cases are covered
