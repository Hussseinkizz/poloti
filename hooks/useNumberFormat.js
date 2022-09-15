export function useNumberFormat(number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const formattedNumber = formatter.format(number);
  return formattedNumber;
}

// const formattedNumber = useNumberFormat(1248900);
// console.log(formattedNumber);
