import React from 'react';
import { TaskProps, ApiResponse, TaskData } from '@/shared/types/api.type';
import { TaskRow } from '../components/TaskRow';
import { showError } from '@/shared/services/notification/notificationService';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../hooks/queryKeys';

interface TaskRowContainerProps {
  task: TaskProps;
  onEdit: (task: TaskProps) => void;
  onToggleTask: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  isToggling?: boolean;
  isDeleting?: boolean;
}

export const TaskRowContainer: React.FC<TaskRowContainerProps> = ({
  task,
  onEdit,
  onToggleTask,
  onDeleteTask,
  isToggling = false,
  isDeleting = false,
}) => {
  const queryClient = useQueryClient();
  
  // Check if the task is in an optimistic state by looking at the query cache
  const isOptimistic = React.useMemo(() => {
    const queries = queryClient.getQueriesData<ApiResponse<TaskData>>({ queryKey: taskKeys.lists() });
    return queries.some(([_, data]) => {
      if (!data?.data?.tasks) return false;
      const taskInCache = data.data.tasks.find((t: TaskProps) => t.id === task.id);
      return taskInCache && taskInCache.updatedAt !== task.updatedAt;
    });
  }, [queryClient, task.id, task.updatedAt]);

  const handleToggleComplete = async () => {
    try {
      await onToggleTask(task.id);
    } catch (error) {
      console.error('Error toggling task:', error);
      showError('Failed to toggle task completion');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await onDeleteTask(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      showError('Failed to delete task');
    }
  };

  return (
    <TaskRow
      {...task}
      onEdit={onEdit}
      onToggle={handleToggleComplete}
      onDelete={handleDeleteTask}
      isToggling={isToggling}
      isDeleting={isDeleting}
      isOptimistic={isOptimistic}
    />
  );
};

TaskRowContainer.displayName = 'TaskRowContainer';
