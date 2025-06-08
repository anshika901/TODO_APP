import { TaskCard } from './TaskCard';
import { TaskListItem } from './TaskListItem';
import { Task } from '@/context/TaskContext';

interface TaskListProps {
  tasks: Task[];
  viewMode: 'cards' | 'list';
  onEditTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, viewMode, onEditTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center px-4">
          <p className="text-base md:text-lg">No tasks found</p>
          <p className="text-sm">Add a new task to get started!</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={() => onEditTask(task)} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-3">
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} onEdit={() => onEditTask(task)} />
      ))}
    </div>
  );
};