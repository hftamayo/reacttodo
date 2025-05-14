import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/dialogs/alert-dialog';
import { Button } from '@/shared/components/ui/button/Button';
import { FaRegTrashAlt } from 'react-icons/fa';

interface DeleteDialogProps {
  title: string;
  isDeleting: boolean;
  onConfirm: () => Promise<void>;
}

export const DeleteTaskDialog = ({
  title,
  isDeleting,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          disabled={isDeleting}
          aria-label={`Delete entity "${title}"`}
        >
          <FaRegTrashAlt />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Entity</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the entity "{title}"? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isDeleting}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
