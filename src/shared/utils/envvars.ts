export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? '';
export const HEALTH_CHECK_INTERVAL =
  import.meta.env.HEALTH_CHECK_INTERVAL ?? 60000;
export const OFFLINE_CHECK_INTERVAL =
  import.meta.env.OFFLINE_CHECK_INTERVAL ?? 5000;
export const MAX_RETRIES = import.meta.env.MAX_RETRIES ?? 3;
export const PAGINATION_LIMIT = import.meta.env.VITE_PAGINATION_LIMIT
  ? Number(import.meta.env.VITE_PAGINATION_LIMIT)
  : 5;
export const EXECUTION_MODE =
  import.meta.env.VITE_EXECUTION_MODE ?? 'development';
export const DATALAYER_TYPE = import.meta.env.VITE_DATALAYER_TYPE ?? 'sql';
