import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription } from 'shadcn/dialog';
import { DialogFooter, DialogHeader, DialogTitle } from 'shadcn/dialog';
import { Button } from 'shadcn/button';
import { Ban } from 'lucide-react';

export const ForbiddenDialog = ({ apiError, setApiError }) => {
  const onOpenChange = (value) => {
    if (!value) {
      setApiError(null);
    }
  };
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-10">
            <Ban className="h-12 w-12 text-red-500" />
            Unauthorized Access
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 py-5">
            Your are not authorized to perform this action.
          </DialogDescription>
        </DialogHeader>
        <p>If you think this is an error, please contact your manager.</p>
        <DialogFooter>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
