import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'shadcn/card';
import { VariantsConfigUI } from './VariantsConfigUI';
import * as Modals from './VariantModals';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useVariantWeights } from '@/state/experiments/useVariantWeights';
import { useVariants } from '@/state/experiments/useVariants';

export const VariantsConfig = ({ experiment }) => {
  const { id: experimentId } = experiment;
  const [openModal, setOpenModal] = useState(null);
  const TheModal = Modals[openModal?.action];

  const experimentManager = useExperiment(experimentId);
  const { updateExperiment } = experimentManager;
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
          setOpenModal={setOpenModal}
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
          onClose={() => setOpenModal(null)}
        />
      )}
    </Card>
  );
};
