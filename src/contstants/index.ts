const env = import.meta.env

const constants = {
  TOKEN_REFRESH_TIMEOUT: env.VITE_APP_REFRESH_TIMEOUT_IN_MINUTES || 240,
  CHARACTER_SYNC_TIMEOUT: env.VITE_APP_CHARACTER_SYNC_TIMEOUT_IN_MS || 3000
}

export default constants
