import { Trash2 } from 'lucide-react';
import { Button } from 'shadcn/button';
import { cn } from 'helpers/cn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from 'shadcn/dropdown-menu';
import { DropdownMenuLabel, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
const { VITE_EDITOR_URL } = import.meta.env;

export const VariantsConfigUI = (props) => {
  const BEARER_TOKEN = localStorage.getItem('BEARER_TOKEN');
  const { variants, experiment, setOpenModal, originalWeight, floatingWeight } = props;
  const { editorUrl } = experiment;

  const openEditor = (variant, isOldEditor) => {
    const isOriginal = variant.name === 'Original';
    if (isOriginal) return window.open(experiment.editorUrl, '_blank');
    if (isOldEditor) {
      const token = localStorage.getItem('BEARER_TOKEN');
      const oldEditorUrl = `${editorUrl}?pertentoToken=${token}&pertentoVariant=${variant.id}`;
      return window.open(oldEditorUrl, '_blank');
    }
    window.open(`${VITE_EDITOR_URL}/${variant.id}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-5">
      {variants.map((variant) => {
        const isOriginal = variant.name === 'Original';
        const weight = (isOriginal ? originalWeight : variant.weight || floatingWeight) / 100;
        let changesCount = variant.changes.length;
        const { globalCSS, globalJavascript } = variant;
        if (globalCSS) changesCount++;
        if (globalJavascript) changesCount++;

        return (
          <div key={variant.id} className="flex items-center">
            <div className="flex-1">
              <a
                className={cn('text-secondary-foreground block', !isOriginal && 'cursor-pointer hover:underline')}
                onClick={() => !isOriginal && setOpenModal({ action: 'EditName', variant })}
              >
                <strong>
                  {variant.name} ({variant.id})
                </strong>
              </a>
              {isOriginal ? (
                <p>{weight.toFixed(2)}%</p>
              ) : (
                <a onClick={() => setOpenModal({ action: 'EditWeights', variant })}>{weight.toFixed(2)}%</a>
              )}
            </div>
            {experiment.type === 'URL Redirect' && (
              <div className="flex-1">
                <a
                  className={cn('text-secondary-foreground block', !isOriginal && 'cursor-pointer hover:underline')}
                  onClick={() => !isOriginal && setOpenModal({ action: 'EditName', variant })}
                >
                  {variant.redirectUrl}
                </a>
              </div>
            )}
            {experiment.type === 'Multi Variant' && (
              <div className="flex-1">
                {isOriginal ? (
                  <a onClick={() => openEditor(variant)} target="_blank">
                    View Original
                  </a>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <a>Open Editor</a>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => openEditor(variant)}>New Editor</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditor(variant, true)}>Original Editor</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <p className="text-sm text-muted-foreground">
                  <span>{!isOriginal && `${changesCount} changes made`}&nbsp;</span>
                </p>
              </div>
            )}
            <Trash2
              onClick={() => !isOriginal && setOpenModal({ action: 'DeleteVariant', variant })}
              className={cn('text-muted-foreground cursor-pointer', isOriginal && 'cursor-auto opacity-0')}
            />
          </div>
        );
      })}
      <div className="flex justify-between mt-5">
        <Button className="font-bold" variant="ghost" onClick={() => setOpenModal({ action: 'AddNewVariant' })}>
          + Add new variant
        </Button>

        <Button
          className="font-bold"
          variant="ghost"
          title={editorUrl}
          onClick={() => setOpenModal({ action: 'ChangeEditorUrl' })}
        >
          Editor page: {editorUrl?.substr(0, 75)} {editorUrl?.length > 75 ? '...' : ''} (<a>edit</a>)
        </Button>
      </div>
    </div>
  );
};
