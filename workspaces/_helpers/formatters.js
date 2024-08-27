export const leftpad = (num = 0, size) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

export const rightpad = (num = 0, size) => {
  let s = num + '';
  while (s.length < size) s = s + '0';
  return s;
};

export const formatPercent = (num) => {
  if (typeof num === 'undefined' || num === null) return '';
  const [left, right] = num.toString().split('.');
  return `${leftpad(left || 0, 2)}.${rightpad(right || 0, 2)}`;
};

export const formatTime = (num) => {
  return !!num ? new Date(num).toLocaleTimeString() : '';
};

export const formatDate = (num) => {
  return !!num ? new Date(num).toLocaleDateString() : '';
};

export const formatDateTime = (num) => {
  return !!num ? `${formatDate(num)} ${formatTime(num)}` : '';
};

// export const formatCurrency = (val) => {
//   return (val / 100).toFixed(2);
// };

export const formatCurrency = (value, currency) => {
  const locale = navigator.language || navigator.languages[0];
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  return formatter.format(value);
};

export const formatNumber = (value) => {
  const locale = navigator.language || navigator.languages[0];
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(value || 0);
};

export const formatPercentage = (value) => (value ? `${value.toFixed(2)}%` : '00.00%');

export const formatDiff = (value, isPercent, decimals = false) =>
  value ? `${value > 0 ? '+' : ''}${value.toFixed(decimals ? 2 : 0)}${isPercent ? '%' : ''}` : '';
