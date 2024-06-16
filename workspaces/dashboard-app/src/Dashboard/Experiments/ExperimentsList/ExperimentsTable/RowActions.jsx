import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from 'shadcn/dropdown-menu';
import { DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { Button } from 'shadcn/button';
import { MoreHorizontal } from 'lucide-react';
import { ConfirmDialogs } from './ConfirmDialogs';

export const RowActions = ({ experiment }) => {
  const { id, status } = experiment;
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const navigate = useNavigate();

  const canDelete = experiment.status === 'Draft';
  const canArchive = experiment.status === 'Ended';

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
        <DropdownMenuItem onClick={() => navigate(`/experiments/${id}`)}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialogAction('duplicate')}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDialogAction('archive')} disabled={!canArchive}>
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialogAction('delete')} disabled={!canDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      {dialogAction && (
        <ConfirmDialogs
          experiment={experiment}
          dialogAction={dialogAction}
          setDialogAction={setDialogAction}
        />
      )}
    </DropdownMenu>
  );
};
