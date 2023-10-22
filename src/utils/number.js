const numberWithZero = (number, size) => {
  let num = number.toString()
  while (num.length < size) num = `0${num}`
  return num
}

export { numberWithZero }
