import { ExperimentVariantList } from './ExperimentVariantList';
import { EditorSwitch } from './EditorSwitch';
import { useAuth } from 'hooks/useAuth';
import { useExtensionData } from '@/state/useExtensionData';

export const ExperimentList = () => {
  const { user, isLoading, signin, signout } = useAuth();
  const { tabId, websiteId, experimentId, variantId } = useExtensionData();

  if (isLoading || !tabId) return null;

  return (
    <div className="pt-0 pb-5  w-[740px] h-[600px]">
      <div className="px-3 py-2">
        <div className="flex flex-col gap-3">
          {!!websiteId ? (
            <div className="flex flex-col gap-4 py-2">
              <div className="flex items-center justify-between h-12">
                <h6>Website: {websiteId}</h6>
                <h6 className="text-center">{experimentId && `experiment: ${experimentId}`}</h6>
                <h6 className="text-center">{variantId && `variant: ${variantId}`}</h6>
                <div className="text-right">{variantId && <EditorSwitch />}</div>
              </div>
              <ExperimentVariantList />
            </div>
          ) : (
            <h5 className="pt-5 text-center">Website not integrated</h5>
          )}
        </div>
      </div>
    </div>
  );
};
