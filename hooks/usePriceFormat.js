export default function usePriceFormat(value) {
  let digitCount = value.toString().length;
  // console.log(digitCount);

  if (digitCount >= 7 && digitCount <= 10) {
    return `${value / 1000000} M`;
  }
  if (digitCount >= 10 && digitCount <= 12) {
    return `${value / 1000000000} B`;
  }
  // if (digitCount <= 6) {
  //   return `${value / 1000} K`;
  // }
  return `${value / 1000} K`;
}
