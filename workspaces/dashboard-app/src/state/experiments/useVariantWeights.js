import { useState } from 'react';
import { useVariants } from './useVariants';

export const useVariantWeights = (expermentId, variantId = null) => {
  const { variants } = useVariants(expermentId);
  const variant = variants?.find((variant) => variant.id === variantId);

  const originalVariant = variants?.find((variant) => variant.name === 'Original');
  const isFloating = variant && variant.weight === null;
  const [variantWeight, setVariantWeight] = useState(isFloating ? null : variant?.weight);

  if (!variant) {
    const availableWeight =
      10000 - variants?.reduce((sum, variant) => sum + variant.weight || 0, 0);
    const notWeightedVariants = variants?.filter(
      (variant) => variant.name !== 'Original' && variant.weight === null,
    );
    const weightedVariants = variants?.filter((variant) => variant.weight !== null);
    const totalWeighted = weightedVariants?.reduce((sum, variant) => sum + variant.weight, 0);
    const floatingWeight = Math.floor(availableWeight / (notWeightedVariants?.length + 1));
    const totalFloating = floatingWeight * notWeightedVariants?.length;
    const originalWeight =
      originalVariant?.weight !== null
        ? originalVariant?.weight
        : 10000 - totalWeighted - totalFloating;

    const variantWeights = variants?.map((variant) => {
      return variant.name === 'Original'
        ? { id: variant.id, weight: originalWeight }
        : variant.weight !== null
          ? { id: variant.id, weight: variant.weight }
          : { id: variant.id, weight: floatingWeight };
    });

    return {
      weightedVariants,
      notWeightedVariants,
      availableWeight,
      totalWeighted,
      floatingWeight,
      totalFloating,
      originalWeight,
      variantWeights,
    };
  }

  const weightedVariants = variants.filter((item) => item.weight !== null);
  const floatingVariants = variants.filter((item) => {
    if (variantWeight !== null && item === variant) {
      return false;
    }
    return item.weight === null;
  });
  const totalWeighted = weightedVariants.reduce((sum, item) => sum + item.weight, 0);
  const takenWeight = totalWeighted - (variant.weight || 0) + (variantWeight || 0);
  const availableWeight = 10000 - takenWeight;
  let floatingWeight = availableWeight / floatingVariants.length;
  const floatingSum = floatingWeight * floatingVariants.length;
  const remainder = 10000 - totalWeighted - floatingSum;
  const originalWeight =
    floatingWeight + remainder - (variantWeight || 0) + (isFloating ? 0 : variant?.weight);

  return {
    originalVariant,
    weightedVariants,
    floatingVariants,
    totalWeighted,
    takenWeight,
    availableWeight,
    floatingWeight,
    floatingSum,
    remainder,
    originalWeight,
    variantWeight,
    setVariantWeight,
  };
};
