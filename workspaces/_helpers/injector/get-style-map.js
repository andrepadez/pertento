export const getCurrentStyle = (element) => {
  const cssDeclaration = element.style;
  return Object.keys(cssDeclaration).reduce((acc, key) => {
    if (!!cssDeclaration[key] && isNaN(key)) {
      acc[key] = cssDeclaration[key];
    }
    return acc;
  }, {});
};
