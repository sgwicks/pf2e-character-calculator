const env = import.meta.env

const constants = {
  TOKEN_REFRESH_TIMEOUT: env.VITE_APP_REFRESH_TIMEOUT_IN_MINUTES || 240,
  AUTOSAVE_INTERVAL: env.VITE_APP_AUTOSAVE_INTERVAL_IN_MS || 1000
}

export default constants
