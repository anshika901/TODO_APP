
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskProvider } from "@/context/TaskContext";
import TodoApp from "./pages/TodoApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TaskProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoApp />} />
              <Route path="/today" element={<TodoApp filter="today" />} />
              <Route path="/all" element={<TodoApp filter="all" />} />
              <Route path="/important" element={<TodoApp filter="important" />} />
              <Route path="/completed" element={<TodoApp filter="completed" />} />
              <Route path="/uncompleted" element={<TodoApp filter="uncompleted" />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TaskProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
