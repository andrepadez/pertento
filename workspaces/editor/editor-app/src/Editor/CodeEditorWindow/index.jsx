import { useState } from 'react';
import { Button } from 'shadcn/button';
import { Select } from 'components/Select';
import { Minimize, Maximize } from 'lucide-react';
import { Dialog, DialogContent } from 'shadcn/dialog';
import { DialogHeader, DialogTitle } from 'shadcn/dialog';
import { useCodeEditor } from '@/state/useCodeEditor';
import { CodeEditor } from './CodeEditor';
import { cn } from 'helpers/cn';
import './codeEditor.css';

export const CodeEditorWindow = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const manager = useCodeEditor();
  const { codeEditorOpen, setCodeEditorOpen, language, action } = manager;
  const { handleFormat, handleSave, closeEditor, changeAction } = manager;
  const { HTML_CODE_EDITOR_ACTIONS } = manager;

  const onConfirm = async (ev) => {};

  return (
    <Dialog open={codeEditorOpen} onOpenChange={setCodeEditorOpen}>
      <DialogContent
        className={cn(
          'flex flex-col w-[50%] max-w-[50%] h-[50vh] max-h-[50vh]',
          isFullscreen && 'w-[95%] max-w-[95%] h-[95vh] max-h-[95vh]',
        )}
      >
        <DialogHeader>
          <div className="flex justify-between">
            <div>
              {isFullscreen ? (
                <Minimize className="cursor-pointer" onClick={() => setIsFullscreen(false)} />
              ) : (
                <Maximize className="cursor-pointer" onClick={() => setIsFullscreen(true)} />
              )}
            </div>
            {language === 'html' ? (
              <DialogTitle>Edit Element HTML</DialogTitle>
            ) : (
              <DialogTitle>Add global {language === 'js' ? 'Javascript' : 'CSS'}</DialogTitle>
            )}

            <div></div>
          </div>
        </DialogHeader>
        <CodeEditor manager={manager} />
        <div className="flex justify-between">
          <Button onClick={handleFormat} variant="outline">
            Format Code
          </Button>
          {language === 'html' && (
            <Select
              options={HTML_CODE_EDITOR_ACTIONS}
              value={action}
              onValueChange={changeAction}
              className="w-32"
            />
          )}
          <div className="flex gap-5">
            <Button variant="outline" onClick={closeEditor}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
