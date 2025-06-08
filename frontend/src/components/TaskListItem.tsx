import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star, CheckCircle } from 'lucide-react';
import { Task, useTasks } from '@/context/TaskContext';
import { format } from 'date-fns';

interface TaskListItemProps {
  task: Task;
  onEdit: () => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleToggleComplete = () => {
    updateTask(task.id, { is_completed: !task.is_completed });
  };

  const handleToggleImportant = () => {
    updateTask(task.id, { is_important: !task.is_important });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-3 md:p-4 transition-all hover:shadow-sm ${task.is_completed ? 'opacity-75' : ''}`}>
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <h3 className={`font-medium text-sm md:text-base leading-tight ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center flex-wrap gap-1">
              {task.is_important && (
                <Badge variant="secondary" className="text-xs">
                  Important
                </Badge>
              )}
              {task.is_completed && (
                <Badge variant="default" className="text-xs">
                  Completed
                </Badge>
              )}
              {task.due_date && (
                <Badge variant="outline" className="text-xs">
                  {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </Badge>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between sm:justify-end space-x-2 flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleImportant}
              className={`p-2 h-8 ${task.is_important ? 'text-yellow-500' : 'text-muted-foreground'}`}
            >
              <Star className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            
            <Button
              size="sm"
              variant={task.is_completed ? "outline" : "default"}
              onClick={handleToggleComplete}
              className="text-xs h-8 px-2 md:px-3"
            >
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {task.is_completed ? 'Undo' : 'Complete'}
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="ghost" onClick={onEdit} className="p-2 h-8">
              <Edit className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            
            <Button size="sm" variant="ghost" onClick={handleDelete} className="text-destructive p-2 h-8">
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
