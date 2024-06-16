import React, { useState, useEffect } from 'react';
import { Button } from 'shadcn/button';
import { Separator } from 'shadcn/separator';
import { Slider } from 'components/Slider';
import { ConfirmDialog } from 'components/Dialogs';
import { useVariants } from '@/state/experiments/useVariants';
import { useVariantWeights } from '@/state/experiments/useVariantWeights';

export const EditWeights = ({ variants, variant, experiment, onClose }) => {
  const { changeWeight, resetWeight, setMaxWeight } = useVariants(experiment.id);
  const manager = useVariantWeights(experiment.id, variant.id);
  const { weightedVariants, floatingVariants } = manager;
  const { floatingWeight, originalWeight, totalWeighted, originalVariant } = manager;
  const { variantWeight, setVariantWeight, isFloating } = manager;

  const onValueChange = ([value]) => {
    const theValue = +value * 100;
    let max = 10000 - totalWeighted;
    if (!isFloating) {
      max += variant.weight;
    }
    const setValue = +theValue >= max ? max : theValue;
    setVariantWeight(setValue);
  };

  const onSave = async () => {
    await changeWeight(variant.id, variantWeight);
    onClose();
  };

  const onReset = async () => {
    await resetWeight(variant.id);
    onClose();
  };

  const onSetMaxWeight = async () => {
    await setMaxWeight(variant.id);
    onClose();
  };

  const floatingVariantsList = floatingVariants.filter(
    (item) => item !== variant && item.name !== 'Original',
  );

  const weightedVariantsList = weightedVariants.filter((item) => item !== variant);

  const currentWeight = variantWeight !== null ? variantWeight : floatingWeight;

  return (
    <ConfirmDialog
      title="Change Weghts"
      onConfirm={onSave}
      onClose={onClose}
      confirmLabel="Save Changes"
    >
      <div className="flex flex-col gap-4">
        <div>
          <strong>{variant.name}: </strong>
          <strong>{(currentWeight / 100).toFixed(2)} %</strong>
        </div>
        <Slider defaultValue={[currentWeight / 100]} onValueChange={onValueChange} />
        <div className="flex justify-around">
          <Button onClick={onReset} disabled={variant.weight === null} variant="outline">
            Reset
          </Button>
          <Button onClick={onSetMaxWeight}>100%</Button>
        </div>
        {floatingVariantsList.length > 0 && (
          <div className="flex flex-col gap-5">
            <Separator className="my-5" />
            {floatingVariantsList.map((item) => {
              const weight = item.weight === null ? floatingWeight : item.weight;
              return (
                <div key={item.id}>
                  <div className="mb-2">
                    <strong>{item.name}: </strong>
                    <strong>{(weight / 100).toFixed(2)} %</strong>
                  </div>
                  <Slider small disabled value={[weight / 100]} aria-label="Small" />
                </div>
              );
            })}
          </div>
        )}
        {weightedVariantsList.length > 0 && (
          <div>
            <Separator className="my-5" />
            {weightedVariantsList.map((item) => (
              <div key={item.id}>
                <div className="mb-2">
                  <strong>{item.name}: </strong>
                  <strong>{(item.weight / 100).toFixed(2)} %</strong>
                </div>
                <Slider small disabled value={[item.weight / 100]} />
              </div>
            ))}
          </div>
        )}
        <Separator className="my-5" />
        <div className="relative w-full">
          <strong>Original: </strong>
          <strong>{(originalWeight / 100).toFixed(2)} %</strong>
          <Slider small disabled value={[originalWeight / 100]} />
        </div>
        <Separator className="my-5" />
      </div>
    </ConfirmDialog>
  );
};
