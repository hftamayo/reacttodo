import '@testing-library/jest-dom';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
(global as any).importMeta = {
  env: {
    VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
    VITE_APP_NAME: process.env.VITE_APP_NAME,
    VITE_BACKEND_TYPE: process.env.VITE_BACKEND_TYPE,
  },
};
