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
}

export const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { group } = useTranslation('logoutConfirmation');

  const handleLogout = () => {
    // Here you would typically call your logout logic
    console.log('User logged out');
    // Clear auth tokens, redirect, etc.
    onConfirm();
  };

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
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="min-w-[80px]"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              Logout
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
          >
            {group.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="min-w-[80px]"
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            {group.confirm}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
