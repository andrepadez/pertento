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

export const formatCurrency = (val) => {
  return (val / 100).toFixed(2);
};
