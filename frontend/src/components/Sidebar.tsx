import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Star, Clock, List, Folder, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onAddTask: () => void;
  currentFilter: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddTask, currentFilter, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'today', label: "Today's Tasks", icon: Calendar, path: '/today' },
    { id: 'all', label: 'All Tasks', icon: List, path: '/' },
    { id: 'important', label: 'Important Tasks', icon: Star, path: '/important' },
    { id: 'completed', label: 'Completed Tasks', icon: CheckCircle, path: '/completed' },
    { id: 'uncompleted', label: 'Uncompleted Tasks', icon: Clock, path: '/uncompleted' },
  ];

  return (
    <div className="w-64 md:w-64 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 md:p-6">
        {/* Mobile Close Button */}
        {onClose && (
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h1 className="text-xl font-bold text-primary">Todo App</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {/* Desktop Title */}
        <h1 className="hidden md:block text-2xl font-bold text-primary mb-6">Todo App</h1>
        
        <Button
          onClick={() => {
            onAddTask();
            onClose?.();
          }}
          className="w-full mb-4 md:mb-6 bg-primary hover:bg-primary/90 text-sm md:text-base"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>

        <nav className="space-y-1 md:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center px-3 py-2 md:py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 md:mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
            Directories
          </h3>
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 text-sm text-muted-foreground">
              <Folder className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate">Main</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
