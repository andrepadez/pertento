export const getExperimentVariantMap = async (experimentData) => {
  return Object.keys(experimentData)
    .filter((key) => key.startsWith('exp-'))
    .reduce((acc, key) => {
      acc[key.replace('exp-', '')] = experimentData[key];
      return acc;
    }, {});
};

export const getExperimentVariantQuery = async (experimentVariantMap) => {
  return Object.keys(experimentVariantMap)
    .map((key) => `exp-${key}=${experimentVariantMap[key]}`)
    .join('&');
};
