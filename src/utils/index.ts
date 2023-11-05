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

export { toTitleCase }
