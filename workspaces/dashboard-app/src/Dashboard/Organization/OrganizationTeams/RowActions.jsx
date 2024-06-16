import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from 'shadcn/dropdown-menu';
import { DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { Button } from 'shadcn/button';
import { MoreHorizontal } from 'lucide-react';
import { ConfirmDialogs } from './ConfirmDialogs';

export const RowActions = ({ user }) => {
  const { id, status } = user;
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const navigate = useNavigate();

  const canDelete = user.status === 'Draft';
  const canArchive = user.status === 'Ended';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open actions</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {user.status === 'Blocked' ? (
          <DropdownMenuItem onClick={() => setDialogAction('unblock')}>Unblock user</DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => setDialogAction('block')}
            disabled={['Blocked', 'Active'].includes(user.status)}
          >
            Block user
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => setDialogAction('ban')} disabled={user.status !== 'Blocked'}>
          Ban user
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDialogAction('delete')} disabled={user.status !== 'Banned'}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      {dialogAction && <ConfirmDialogs user={user} dialogAction={dialogAction} setDialogAction={setDialogAction} />}
    </DropdownMenu>
  );
};
