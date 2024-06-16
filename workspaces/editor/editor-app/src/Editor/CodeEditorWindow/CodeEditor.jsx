import ReactCodeEditor from '@uiw/react-textarea-code-editor';
import { ScrollArea } from 'shadcn/scroll-area';

export const CodeEditor = ({ manager }) => {
  const { value, setValue, language } = manager;
  return (
    <ScrollArea className="flex flex-col flex-1 bg-black">
      <ReactCodeEditor
        value={value}
        language={language}
        placeholder={`Please enter ${language?.toUpperCase()} code.`}
        onChange={(ev) => setValue(ev.target.value)}
        padding={15}
        lines={10}
        style={{
          backgroundColor: '#000',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          fontSize: '16px',
          flex: 1,
        }}
      />
    </ScrollArea>
  );
};
