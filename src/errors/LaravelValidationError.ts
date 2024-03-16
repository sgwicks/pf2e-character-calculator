/**
 * Takes a Laravel validation error and parses the errors
 * into an easily-spread string
 */
type LaravelErrors = Record<string, string[]>

class LaravelValidationError extends Error {
  errors: string[] = []
  laravelErrors: LaravelErrors = {}

  constructor(errors: LaravelErrors, ...params: any[]) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LaravelValidationError)
    }

    this.name = 'LaravelValidationError'
    this.laravelErrors = errors

    for (const error in errors) {
      this.errors.push(...errors[error])
    }
  }
}

export default LaravelValidationError
