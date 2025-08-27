import { FC } from 'react';
import { TaskStats } from '@/shared/types/domains/task.type';

export const TaskBoardStats: FC<TaskStats> = ({ total, completed, remaining }) => {
  // Don't render anything if there are no tasks
  if (total <= 0) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-center items-center space-x-8">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Total:</span>
          <span className="text-sm font-bold text-gray-800">{total}</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Completed:</span>
          <span className="text-sm font-bold text-gray-800">{completed}</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Remaining:</span>
          <span className="text-sm font-bold text-gray-800">
            {remaining}
          </span>
        </div>
      </div>
    </div>
  );
};

TaskBoardStats.displayName = 'TaskStats';
