import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useExtensionData } from '@/state/useExtensionData';
import { useExtensionIframe } from '@/state/useExtensionIframe';

export const ExperimentVariantsTable = ({ experiments }) => {
  const { isOpen: isEditorIframeOpen } = useExtensionIframe();
  const { experimentId, variantId, changeVariant, changeExperiment } = useExtensionData();

  return experiments.length > 0 ? (
    <DataTable
      data={experiments}
      columns={[
        { field: 'id', label: 'ID' },
        {
          field: 'name',
          label: 'Name',
          format: ({ value }) => <div className="text-sm text-wrap">{value}</div>,
        },
        {
          field: 'variants',
          label: 'Variants',
          format: ({ value: variants, item: experiment }) => (
            <div>
              {isEditorIframeOpen ? (
                <label>{variants.length} variants</label>
              ) : (
                <a
                  data-experiment={experiment.id}
                  className="flex items-center justify-end gap-8"
                  onClick={changeExperiment}
                >
                  <span>{variants.length} variants</span>
                  <ChevronDown size={16} />
                </a>
              )}
              {experimentId === experiment.id && (
                <ul className="flex flex-col min-w-[250px] gap-4 my-5">
                  {variants?.map((variant) => (
                    <li className="flex justify-between text-sm" key={variant.id}>
                      <div>{variant.id}</div>
                      {isEditorIframeOpen ? (
                        <label>{variant.name}</label>
                      ) : (
                        <a data-variant={variant.id} data-experiment={experiment.id} onClick={changeVariant}>
                          {variant.name}
                        </a>
                      )}
                      <div> {variant.changes.length || 0} changes</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ),
        },
      ]}
    />
  ) : (
    <div>
      <h1>No Experiments</h1>
    </div>
  );
};
