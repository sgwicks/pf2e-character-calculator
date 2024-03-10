const env = import.meta.env

const constants = {
  REFRESH_TIMEOUT: env.VITE_APP_REFRESH_TIMEOUT_IN_MINUTES || 240
}

export default constants