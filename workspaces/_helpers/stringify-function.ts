export const stringifyFunction = (fn, args) => {
  if (!fn) return '';
  const functionAsString = fn.toString();
  const bodyStart = functionAsString.indexOf('{') + 1;
  const bodyEnd = functionAsString.lastIndexOf('}');
  let functionBody = functionAsString.substring(bodyStart, bodyEnd).trim();

  if (args) {
    for (const [key, value] of Object.entries(args)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      functionBody = functionBody.replace(regex, JSON.stringify(value));
    }
  }

  functionBody = functionBody
    .replace(/\bev\./g, 'event.')
    .replace(/\}\s\= ev/g, '} = event')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ');

  return `(function(){${functionBody}})();`;
};

// const randomId = Math.random().toString(36).substring(7);

// const onLoad = stringifyFunction(
//   () => {
//     const id = randomId;
//     console.log('here', id);
//   },
//   { randomId },
// );
