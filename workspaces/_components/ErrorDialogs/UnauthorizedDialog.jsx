import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription } from 'shadcn/dialog';
import { DialogFooter, DialogHeader, DialogTitle } from 'shadcn/dialog';
import { Button } from 'shadcn/button';
import { Ban } from 'lucide-react';
import { useAuth } from 'hooks/useAuth';

export const UnauthorizedDialog = ({ apiError, setApiError }) => {
  const { signout } = useAuth();
  const onOpenChange = (value) => {
    if (!value) {
      setApiError(null);
      signout();
      window.location.reload();
    }
  };
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-10">
            <Ban className="h-12 w-12 text-red-500" />
            Invalid Credentials
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 py-5">Your access token has expired</DialogDescription>
        </DialogHeader>
        <p>Please Signin again</p>
        <DialogFooter>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
