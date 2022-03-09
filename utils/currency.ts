const formatAmountForDisplay = (
  amount: number = 0,
  floor = true,
  symbol = true,
) => {
  const numberFormat = new Intl.NumberFormat(['en-US']);
  const floored = Math.floor(amount);
  const digits = Math.floor((amount * 100) - (floored * 100));
  let digitsDisplay = '';
  if (digits && (!floor || amount < 10)) {
    if (digits < 10) {
      digitsDisplay = `.0${digits}`;
    } else {
      digitsDisplay = `.${digits}`;
    }
  }
  return (symbol ? '$' : '') + numberFormat.format(floored) + digitsDisplay;
};

export default formatAmountForDisplay;
