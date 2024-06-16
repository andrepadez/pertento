export const pickRandomVariant = (variants) => {
  // const totalWeight = variants.reduce((acc, variant) => acc + variant.weight, 0);
  const totalWeight = 10000;
  let randomWeight = Math.floor(Math.random() * totalWeight);
  for (let key of Object.keys(variants)) {
    const variant = variants[key];
    if (randomWeight < variant.weight) {
      return variant;
    }
    randomWeight -= variant.weight;
  }
  return null;
};
