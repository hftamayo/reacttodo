import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { Button } from '@/shared/components/ui/button/Button';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

interface LogoutConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const { group } = useTranslation('logoutConfirmation');

  if (!group) {
    return (
      <Card className="min-w-[350px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaSignOutAlt className="w-5 h-5 text-red-500" />
              <CardTitle>Confirm Logout</CardTitle>
            </div>
            <button
              onClick={onCancel}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <FaTimes className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-700">
            Are you sure you want to logout? You will need to login again to
            access your tasks.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={onCancel}
              className="min-w-[80px]"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="min-w-[80px]"
              disabled={isLoading}
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaSignOutAlt className="w-5 h-5 text-red-500" />
            <CardTitle>{group.title}</CardTitle>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-700">{group.message}</p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="min-w-[80px]"
            disabled={isLoading}
          >
            {group.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="min-w-[80px]"
            disabled={isLoading}
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            {isLoading ? 'Logging out...' : group.confirm}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
