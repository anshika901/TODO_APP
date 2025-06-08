import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star, CheckCircle } from 'lucide-react';
import { Task, useTasks } from '@/context/TaskContext';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
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
    <Card className={`transition-all hover:shadow-md ${task.is_completed ? 'opacity-75' : ''} h-fit`}>
      <CardHeader className="pb-2 md:pb-3">
        <div className="flex items-start justify-between">
          <h3 className={`font-medium text-sm md:text-base leading-tight ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </h3>
          <div className="flex space-x-1 ml-2 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleImportant}
              className={`p-1 h-auto ${task.is_important ? 'text-yellow-500' : 'text-muted-foreground'}`}
            >
              <Star className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {task.description && (
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {task.due_date && (
            <Badge variant="outline" className="text-xs w-fit">
              {format(new Date(task.due_date), 'MMM dd, yyyy')}
            </Badge>
          )}
          
          <div className="flex items-center space-x-1 flex-wrap">
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
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
          <Button
            size="sm"
            variant={task.is_completed ? "outline" : "default"}
            onClick={handleToggleComplete}
            className="text-xs h-8 w-full sm:w-auto"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            {task.is_completed ? 'Undo' : 'Complete'}
          </Button>
          
          <div className="flex space-x-1 justify-end">
            <Button size="sm" variant="ghost" onClick={onEdit} className="p-2 h-8">
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDelete} className="text-destructive p-2 h-8">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};