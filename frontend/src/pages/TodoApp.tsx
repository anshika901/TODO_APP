import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';
import { RightPanel } from '@/components/RightPanel';
import { TaskModal } from '@/components/TaskModal';
import { useTasks } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface TodoAppProps {
  filter?: string;
}

const TodoApp: React.FC<TodoAppProps> = ({ filter = 'all' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply view filter
    switch (filter) {
      case 'today':{
        const today = new Date().toISOString().split('T')[0];
        return task.due_date === today;
      }
      case 'important':
        return task.is_important;
      case 'completed':
        return task.is_completed;
      case 'uncompleted':
        return !task.is_completed;
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'date':
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      case 'status':
        return Number(a.is_completed) - Number(b.is_completed);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Hidden on mobile, slide-in overlay on mobile when open */}
        <div className={`
          fixed md:relative 
          h-full z-50 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
          <Sidebar 
            onAddTask={() => setIsModalOpen(true)} 
            currentFilter={filter}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden w-full md:w-auto">
          {/* Mobile Header with Hamburger */}
          <div className="md:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Todo App</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="text-xs px-3"
            >
              Add Task
            </Button>
          </div>

          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <TaskList
                tasks={sortedTasks}
                viewMode={viewMode}
                onEditTask={(task) => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
              />
            </div>
            
            {/* Right Panel - Hidden on mobile and tablets */}
            <div className="hidden xl:block">
              <RightPanel tasks={tasks} />
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />

      <footer className="bg-card border-t px-4 md:px-6 py-4 text-center text-sm text-muted-foreground">
        Projected by Anshika Gupta
      </footer>
    </div>
  );
};

export default TodoApp;