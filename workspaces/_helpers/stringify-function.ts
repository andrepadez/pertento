export const stringifyFunction = (fn) => {
  if (!fn) return '';
  const functionAsString = fn.toString();
  const bodyStart = functionAsString.indexOf('{') + 1;
  const bodyEnd = functionAsString.lastIndexOf('}');
  const functionBody = functionAsString.substring(bodyStart, bodyEnd).trim();
  return functionBody
    .replace(/\bev\./g, 'event.')
    .replace(/\}\s\= ev/g, '} = event')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ');
};
