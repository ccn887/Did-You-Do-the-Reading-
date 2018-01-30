
export const unique = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}

export const tokenize = (text) => {
  let cleanText = text.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ')
  return unique(cleanText)
}
