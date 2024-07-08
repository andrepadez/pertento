import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'shadcn/card';
import { VariantsConfigUI } from './VariantsConfigUI';
import * as Modals from './VariantModals';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useVariantWeights } from '@/state/experiments/useVariantWeights';
import { useVariants } from '@/state/experiments/useVariants';

export const VariantsConfig = ({ experimentId }) => {
  const [openModal, seOpenModal] = useState(null);
  const TheModal = Modals[openModal?.action];

  const experimentManager = useExperiment(experimentId);
  const { experiment, updateExperiment } = experimentManager;
  const variantsManager = useVariants(experimentId);
  const { variants, createVariant, deleteVariant, changeName } = variantsManager;
  const { floatingWeight, originalWeight } = useVariantWeights(experimentId);

  if (!variants || !experiment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <VariantsConfigUI
          variants={variants}
          experiment={experiment}
          seOpenModal={seOpenModal}
          originalWeight={originalWeight}
          floatingWeight={floatingWeight}
        />
      </CardContent>

      {openModal && (
        <TheModal
          experiment={experiment}
          variant={openModal.variant}
          variants={variants}
          manager={variantsManager}
          experimentManager={experimentManager}
          onClose={() => seOpenModal(null)}
        />
      )}
    </Card>
  );
};
