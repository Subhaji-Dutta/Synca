import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { DndContext, closestCorners, DragOverlay, PointerSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "react-hot-toast";
import { Trash2, Calendar as CalendarIcon, Square, Bug, Lightbulb, Sparkles, Wrench } from "lucide-react";
import { updateTask } from "../features/workspaceSlice";
import api from "../configs/api";

const statusConfig = {
    TODO: {
        title: "To Do",
        color: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        headerColor: "text-blue-700 dark:text-blue-300",
        countColor: "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
    },
    IN_PROGRESS: {
        title: "In Progress",
        color: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        headerColor: "text-yellow-700 dark:text-yellow-300",
        countColor: "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
    },
    DONE: {
        title: "Done",
        color: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        headerColor: "text-green-700 dark:text-green-300",
        countColor: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
    }
};

const typeIcons = {
    TASK: { icon: Square, color: "text-blue-500" },
    BUG: { icon: Bug, color: "text-red-500" },
    FEATURE: { icon: Sparkles, color: "text-purple-500" },
    IMPROVEMENT: { icon: Lightbulb, color: "text-yellow-500" },
    OTHER: { icon: Wrench, color: "text-gray-500" }
};

const priorityStyles = {
    HIGH: {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-800",
        text: "text-red-700 dark:text-red-300"
    },
    MEDIUM: {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        text: "text-yellow-700 dark:text-yellow-300"
    },
    LOW: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        text: "text-green-700 dark:text-green-300"
    }
};



const DroppableColumn = ({ status, config, tasks, onTaskClick, onDeleteTask }) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div 
            ref={setNodeRef}
            id={status} 
            className={`${config.color} ${config.border} border rounded-lg p-4 min-h-[600px]`}
            style={{ cursor: 'drop' }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${config.headerColor}`}>
                    {config.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.countColor}`}>
                    {tasks.length}
                </span>
            </div>
            
            <SortableContext 
                items={tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="min-h-[500px] space-y-2 p-2 rounded-lg">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} onDeleteTask={onDeleteTask} />
                    ))}
                    
                    {tasks.length === 0 && (
                        <div className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                            <div className="text-4xl mb-2">📝</div>
                            <p className="text-sm">No tasks in this column</p>
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
};

const TaskCard = ({ task, onTaskClick, onDeleteTask }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const { icon: Icon, color } = typeIcons[task.type] || { icon: Square, color: "text-gray-500" };
    const priorityStyle = priorityStyles[task.priority] || priorityStyles.MEDIUM;
    const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== "DONE";
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onTaskClick(task)}
            className={`group p-3 mb-2 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                isDragging ? "shadow-lg rotate-2 scale-105 opacity-50" : ""
            } ${priorityStyle.bg} ${priorityStyle.border}`}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                    {Icon && <Icon className={`w-4 h-4 ${color}`} />}
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                        {task.title}
                    </h4>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => onDeleteTask(task.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
                    >
                        <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                </div>
            </div>
            
            {task.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}
            
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    {task.assignee && (
                        <div className="flex items-center gap-1">
                            <img 
                                src={task.assignee.image} 
                                alt={task.assignee.name}
                                className="w-5 h-5 rounded-full"
                            />
                            <span className="text-gray-600 dark:text-gray-400">
                                {task.assignee.name}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center gap-2">
                    {isOverdue && (
                        <span className="text-red-500 text-xs font-medium">
                            Overdue
                        </span>
                    )}
                    {task.due_date && (
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="w-3 h-3" />
                            {format(new Date(task.due_date), "MMM dd")}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${priorityStyle.text} ${priorityStyle.bg}`}>
                    {task.priority}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.type}
                </span>
            </div>
        </div>
    );
};

const KanbanBoard = ({ tasks = [] }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [localTasks, setLocalTasks] = useState(tasks);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [filterAssignee, setFilterAssignee] = useState("");
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const assigneeList = [...new Set(tasks.map(task => task.assignee?.name).filter(Boolean))];

    const filteredTasks = localTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !filterType || task.type === filterType;
        const matchesPriority = !filterPriority || task.priority === filterPriority;
        const matchesAssignee = !filterAssignee || task.assignee?.name === filterAssignee;
        
        return matchesSearch && matchesType && matchesPriority && matchesAssignee;
    });

    const tasksByStatus = {
        TODO: filteredTasks.filter(task => task.status === "TODO"),
        IN_PROGRESS: filteredTasks.filter(task => task.status === "IN_PROGRESS"),
        DONE: filteredTasks.filter(task => task.status === "DONE")
    };

    const handleTaskClick = (task) => {
        navigate(`/dashboard/tasks/${task.id}`);
    };

    const handleDeleteTask = async (taskId, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        try {
            const token = await getToken();
            // Backend expects an array of task IDs
            await api.delete(`/api/tasks/delete`, { 
                data: { tasksIds: [taskId] },
                headers: { Authorization: `Bearer ${token}` }
            });

            setLocalTasks(prev => prev.filter(task => task.id !== taskId));
            toast.dismissAll();
            toast.success("Task deleted successfully!");
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || "Failed to delete task");
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        
        if (!over) return;

        const activeTask = localTasks.find(task => task.id === active.id);
        
        // The over.id will be either a column ID (TODO, IN_PROGRESS, DONE) or a task ID
        let newStatus = null;
        
        // Check if dropped on a column (the over.id will be one of the status values)
        if (["TODO", "IN_PROGRESS", "DONE"].includes(over.id)) {
            newStatus = over.id;
        } else {
            // If dropped on another task, find which column that task belongs to
            const overTask = localTasks.find(task => task.id === over.id);
            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (!activeTask || !newStatus) return;

        if (activeTask.status === newStatus) return;

        try {
            const token = await getToken();
            await api.put(`/api/tasks/${activeTask.id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedTask = { ...activeTask, status: newStatus };
            dispatch(updateTask(updatedTask));
            
            setLocalTasks(prev => prev.map(task => 
                task.id === activeTask.id ? updatedTask : task
            ));

            toast.dismissAll();
            toast.success("Task status updated successfully!");
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || "Failed to update task status");
        }

        setActiveId(null);
    };

    return (
        <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex flex-wrap gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                        <option value="">All Types</option>
                        <option value="TASK">Task</option>
                        <option value="BUG">Bug</option>
                        <option value="FEATURE">Feature</option>
                        <option value="IMPROVEMENT">Improvement</option>
                        <option value="OTHER">Other</option>
                    </select>
                    
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                        <option value="">All Priorities</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    
                    <select
                        value={filterAssignee}
                        onChange={(e) => setFilterAssignee(e.target.value)}
                        className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                        <option value="">All Assignees</option>
                        {assigneeList.map(assignee => (
                            <option key={assignee} value={assignee}>{assignee}</option>
                        ))}
                    </select>
                    
                    {(searchTerm || filterPriority || filterType || filterAssignee) && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setFilterPriority("");
                                setFilterType("");
                                setFilterAssignee("");
                            }}
                            className="px-3 py-2 text-sm bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-lg text-zinc-700 dark:text-zinc-300"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
                
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Total: {filteredTasks.length} tasks
                </div>
            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
                    {Object.entries(statusConfig).map(([status, config]) => (
                        <DroppableColumn 
                            key={status}
                            status={status}
                            config={config}
                            tasks={tasksByStatus[status]}
                            onTaskClick={handleTaskClick}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;