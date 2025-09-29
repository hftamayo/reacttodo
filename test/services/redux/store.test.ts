/**
 * @jest-environment jsdom
 */

describe('store configuration (AAA)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('includes logger middleware and enables devTools in development (AAA)', async () => {
    // Arrange
    jest.doMock('../../../src/shared/utils/envvars', () => ({
      EXECUTION_MODE: 'development',
    }));

    // mock rootReducer import to avoid pulling real slices
    jest.doMock('../../../src/shared/services/redux/rootReducer', () => ({
      __esModule: true,
      rootReducer: (state = {}, _action: any) => state,
    }));

    // mock redux-logger to a sentinel value
    jest.doMock('redux-logger', () => ({
      __esModule: true,
      default: 'LOGGER_MW',
    }));

    const configureStoreMock = jest.fn((options: any) => {
      // Act (middleware resolution)
      const chain = options.middleware(() => []);

      // Assert middleware contains our logger
      expect(chain).toContain('LOGGER_MW');
      // Assert devTools is enabled in development
      expect(options.devTools).toBe(true);

      // Return a minimal fake store
      return { dispatch: jest.fn(), getState: jest.fn().mockReturnValue({}), subscribe: jest.fn() } as any;
    });

    jest.doMock('@reduxjs/toolkit', () => ({
      __esModule: true,
      configureStore: configureStoreMock,
    }));

    // Act: import the store module under test
    await import('../../../src/shared/services/redux/store');

    // Assert configureStore called once
    expect(configureStoreMock).toHaveBeenCalledTimes(1);
  });

  it('omits logger middleware and disables devTools in production (AAA)', async () => {
    // Arrange
    jest.resetModules();
    jest.doMock('../../../src/shared/utils/envvars', () => ({
      EXECUTION_MODE: 'production',
    }));

    jest.doMock('../../../src/shared/services/redux/rootReducer', () => ({
      __esModule: true,
      rootReducer: (state = {}, _action: any) => state,
    }));

    jest.doMock('redux-logger', () => ({
      __esModule: true,
      default: 'LOGGER_MW',
    }));

    const configureStoreMock = jest.fn((options: any) => {
      // Act
      const chain = options.middleware(() => []);

      // Assert: no logger pushed in production
      expect(chain).not.toContain('LOGGER_MW');
      // devTools disabled in production
      expect(options.devTools).toBe(false);

      return { dispatch: jest.fn(), getState: jest.fn().mockReturnValue({}), subscribe: jest.fn() } as any;
    });

    jest.doMock('@reduxjs/toolkit', () => ({
      __esModule: true,
      configureStore: configureStoreMock,
    }));

    // Act
    await import('../../../src/shared/services/redux/store');

    // Assert
    expect(configureStoreMock).toHaveBeenCalledTimes(1);
  });
});


