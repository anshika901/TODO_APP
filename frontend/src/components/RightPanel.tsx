import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTasks, Task } from '@/context/TaskContext';

interface RightPanelProps {
  tasks: Task[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ tasks }) => {
  const { theme, toggleTheme } = useTheme();
  const { deleteAllTasks } = useTasks();

  const completedTasks = tasks.filter(task => task.is_completed).length;
  const totalTasks = tasks.length;
  const importantTasks = tasks.filter(task => task.is_important).length;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.due_date === today;
  }).length;

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      deleteAllTasks();
    }
  };

  return (
    <div className="w-72 lg:w-80 bg-card border-l border-border p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-lg">Task Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 lg:space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Tasks:</span>
            <span className="font-medium">{totalTasks}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-medium text-green-600">{completedTasks}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Important:</span>
            <span className="font-medium text-yellow-600">{importantTasks}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Due Today:</span>
            <span className="font-medium text-blue-600">{todayTasks}</span>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-medium">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%'
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="flex items-center space-x-2 text-sm">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Dark Mode</span>
            </Label>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <Button
            variant="destructive"
            onClick={handleDeleteAll}
            className="w-full text-sm"
            disabled={totalTasks === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
