import { Accordion } from 'shadcn/accordion';
import { Source } from './Source';
import { Dimensions } from './Dimensions';
import { Margin } from './Margin';
import { Padding } from './Padding';
import { Position } from './Position';
import { Typography } from './Typography';
import { Background } from './Background';
import { CustomCss } from './CustomCss';
import { cn } from 'helpers/cn';

export const SettingsForm = ({ manager }) => {
  const { openAccordionItems, setOpenAccordionItems } = manager;
  const { formManager, changesManager } = manager;
  const { formState, formRef, update, onSubmit, onChange, isDisabled } = formManager;
  const { addChange, changesByElement } = changesManager;
  const { interactive, selectedElements } = manager;
  const [selected] = selectedElements;

  return (
    <form ref={formRef} onChange={formManager.onChange} onSubmit={onSubmit}>
      <Accordion
        value={openAccordionItems}
        onValueChange={setOpenAccordionItems}
        disabled={isDisabled}
        className={cn('flex w-full flex-col gap-5 px-5 pt-2', isDisabled && 'opacity-50')}
        type="multiple"
      >
        <Source manager={formManager} addChange={addChange} />
        <Dimensions manager={formManager} addChange={addChange} />
        <Margin manager={formManager} addChange={addChange} />
        <Padding manager={formManager} addChange={addChange} />
        <Position manager={formManager} addChange={addChange} />
        <Typography manager={formManager} addChange={addChange} />
        <Background manager={formManager} addChange={addChange} />
        <CustomCss manager={formManager} addChange={addChange} />
      </Accordion>
    </form>
  );
};
