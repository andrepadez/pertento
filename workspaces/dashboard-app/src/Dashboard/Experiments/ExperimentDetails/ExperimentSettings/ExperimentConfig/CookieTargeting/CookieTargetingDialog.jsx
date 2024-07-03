import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Select } from 'shadcn/select';
import { Textarea } from 'shadcn/textarea';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const CookieTargetingDialog = ({ item, manager, experiment, onClose }) => {
  const { cookieTargeting, addCookieTargeting } = manager;
  const { formRef, state, update } = useForm({
    ...item,
    cookieValues: item?.cookieValues?.join('\n'),
  });

  const onConfirm = async (ev) => {
    ev.preventDefault();
    await addCookieTargeting(state);
    onClose();
  };

  const { cookieName, cookieValues } = state;

  const isDisabled = !cookieValues;

  return (
    <ConfirmDialog title="Add Cookie Targeting" onConfirm={onConfirm} onClose={onClose} disabled={isDisabled}>
      <form className="flex flex-col gap-5" ref={formRef} onSubmit={onConfirm}>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid gap-4 mt-5 mb-6">
            <Label className="flex flex-col gap-3">
              <p>Cookies are complicated.</p>
              <p>
                They can be set and managed in an myriad of different ways, each website or application with their own
                structure.
              </p>
              <p>
                So we found the best way to set this condition up is to rely on the text returned from&nbsp;
                <strong>
                  <i>document.cookie&nbsp;</i>
                </strong>
                (you can try this in the developer console of your browser).
              </p>
              <p>So, on the right, separated line by line, enter the possible values (string) you want to track.</p>
              <p>
                If <strong>ONE OF THOSE VALUES</strong> are included in any of the accessible cookies, the customer will
                be tracked for this experiment.
              </p>
              <p>
                <strong>NOTE:&nbsp;</strong>
                Secure cookies (those with the <strong>Secure</strong> attribute) are not accessible to JavaScript so
                please don't target them.
              </p>
            </Label>
          </div>
          <Label className="flex flex-col gap-3">
            <span>Possible values:</span>
            <Textarea
              placeholder={placeholder}
              name="cookieValues"
              defaultValue={state.cookieValues}
              className="min-h-96"
            />
          </Label>
        </div>
      </form>
    </ConfirmDialog>
  );
};

const placeholder = `language=en
language=se`;
