const toTitleCase = (str: string) => {
  const strArray = str.split(' ')

  return strArray
    .map((string: string) => {
      const firstLetter = string.slice(0, 1)
      const remainingWord = string.slice(1)

      return firstLetter.toUpperCase() + remainingWord
    })
    .join(' ')
}

/**
 * Handles the fact that string arrays returned from the API often have erroneous extra spacing
 *
 * @param arr
 * @returns a comma-separated string with spacing
 */
const arrayToString = (arr: string[]) => {
  return arr.map((str) => str.trim()).join(', ')
}

export { toTitleCase, arrayToString }
