import React, { useCallback, useEffect, useState } from 'react';
import { getTareas, createTarea, updateTarea, deleteTarea } from '../service/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [tareas, setTareas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({
        titulo: '',
        descripcion: '',
        prioridad: 'MEDIA',
        completada: false
    });

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchTareas = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getTareas(token);
            setTareas(response.data);
            setError('');
        } catch (error) {
            setError('Error al cargar las tareas');
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTareas();
    }, [token, navigate, fetchTareas]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTarea({ ...newTask }, token);
            setShowNewTaskModal(false);
            setNewTask({ titulo: '', descripcion: '', prioridad: 'MEDIA', completada: false });
            fetchTareas();
        } catch (error) {
            setError('Error al crear la tarea');
        }
    };

    const handleToggleComplete = async (tarea) => {
        try {
            await updateTarea(tarea.id, { ...tarea, completada: !tarea.completada }, token);
            fetchTareas();
        } catch (error) {
            setError('Error al actualizar la tarea');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            try {
                await deleteTarea(id, token);
                fetchTareas();
            } catch (error) {
                setError('Error al eliminar la tarea');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getColorClass = (prioridad) => {
        switch (prioridad) {
            case 'ALTA': return 'bg-postit-red';
            case 'MEDIA': return 'bg-postit-yellow';
            case 'BAJA': return 'bg-postit-green';
            default: return 'bg-white';
        }
    };

    const getTextColorClass = (prioridad) => {
        switch (prioridad) {
            case 'ALTA': return 'text-red-950';
            case 'MEDIA': return 'text-yellow-950';
            case 'BAJA': return 'text-green-950';
            default: return 'text-gray-900';
        }
    };

    const getSubTextColorClass = (prioridad) => {
        switch (prioridad) {
            case 'ALTA': return 'text-red-900/80';
            case 'MEDIA': return 'text-yellow-900/80';
            case 'BAJA': return 'text-green-900/80';
            default: return 'text-gray-600';
        }
    };

    const getRotation = (index) => {
        const rotations = ['-rotate-2', 'rotate-3', 'rotate-1', '-rotate-3', 'rotate-2', '-rotate-1'];
        return rotations[index % rotations.length];
    };

    const getCheckboxClass = (prioridad) => {
        switch (prioridad) {
            case 'ALTA':
                return 'size-5 rounded border-2 border-red-400 text-red-600 focus:ring-0 cursor-pointer';
            case 'MEDIA':
                return 'size-5 rounded border-2 border-yellow-400 text-yellow-600 focus:ring-0 cursor-pointer';
            case 'BAJA':
                return 'size-5 rounded border-2 border-green-400 text-green-600 focus:ring-0 cursor-pointer';
            default:
                return 'size-5 rounded border-2 border-gray-300 text-gray-600 focus:ring-0 cursor-pointer';
        }
    };

    const getPosition = (index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        return {
            top: `${120 + row * 320}px`,
            left: `${150 + col * 380}px`
        };
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-solid border-[#e6eaf4] dark:border-gray-800 bg-white dark:bg-[#151b2b] flex flex-col justify-between p-4 z-40">
                <div className="flex flex-col gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">draw</span>
                        </div>
                        <h2 className="text-[#0c111d] dark:text-white text-lg font-bold leading-tight">Task Manager</h2>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#0c111d] dark:text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 px-3">
                            Workspace
                        </h1>
                        <nav className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
                                <span className="material-symbols-outlined">dashboard</span>
                                <p className="text-sm font-semibold">My Tasks</p>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                                <span className="material-symbols-outlined">grid_view</span>
                                <p className="text-sm font-medium">All Boards</p>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                                <span className="material-symbols-outlined">archive</span>
                                <p className="text-sm font-medium">Completed</p>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Stats & Logout */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Total Tasks</p>
                        <p className="text-2xl font-bold text-primary">{tareas.length}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer transition-colors"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <p className="text-sm font-medium">Logout</p>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-solid border-[#e6eaf4] dark:border-gray-800 bg-white/80 dark:bg-[#151b2b]/80 backdrop-blur-md px-8 py-3 z-30">
                    <div className="flex items-center gap-8 flex-1">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-[#0c111d] dark:text-white">My Task Board</h1>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-green-500"></span>
                                <p className="text-xs text-gray-500 font-medium">
                                    {tareas.filter(t => !t.completada).length} active tasks
                                </p>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowNewTaskModal(true)}
                        className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        <span>New Task</span>
                    </button>
                </header>

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-red-800 dark:text-red-300">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                )}

                {/* Whiteboard Canvas */}
                <div className="flex-1 overflow-auto whiteboard-bg relative">
                    <div className="canvas-container grid-lines-bg relative min-h-full">
                        {tareas.length === 0 ? (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="material-symbols-outlined text-9xl text-gray-300 dark:text-gray-700 mb-4">
                                    post_add
                                </span>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                                    No tasks yet. Create your first one!
                                </p>
                            </div>
                        ) : (
                            tareas.map((tarea, index) => (
                                <div
                                    key={tarea.id}
                                    className={`post-it w-72 ${getColorClass(tarea.prioridad)} p-6 post-it-shadow ${getRotation(index)} ${
                                        tarea.completada ? 'opacity-60' : ''
                                    }`}
                                    style={{ ...getPosition(index), zIndex: 10 + index }}
                                >
                                    {/* Tape effect */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 backdrop-blur-sm rounded-sm"></div>
                                    
                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDeleteTask(tarea.id)}
                                        className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-sm text-red-600">close</span>
                                    </button>

                                    {/* Task Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className={`${getTextColorClass(tarea.prioridad)} text-xl font-handwritten leading-tight font-bold ${
                                            tarea.completada ? 'line-through' : ''
                                        }`}>
                                            {tarea.titulo}
                                        </h3>
                                        <input
                                            className={getCheckboxClass(tarea.prioridad)}
                                            type="checkbox"
                                            checked={tarea.completada}
                                            onChange={() => handleToggleComplete(tarea)}
                                        />
                                    </div>

                                    {/* Task Description */}
                                    <p className={`${getSubTextColorClass(tarea.prioridad)} text-sm font-handwritten mb-6`}>
                                        {tarea.descripcion}
                                    </p>

                                    {/* Task Footer */}
                                    <div className={`flex items-center gap-2 ${getSubTextColorClass(tarea.prioridad).replace('/80', '/60')} text-[10px] font-bold uppercase tracking-wider`}>
                                        <span className="material-symbols-outlined text-sm">
                                            {tarea.completada ? 'verified' : tarea.prioridad === 'ALTA' ? 'priority_high' : 'pending'}
                                        </span>
                                        <span>
                                            {tarea.completada ? 'Completed' : tarea.prioridad}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Floating Toolbar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                    <button
                        onClick={() => setShowNewTaskModal(true)}
                        className="size-12 rounded-xl flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="size-12 rounded-xl flex items-center justify-center bg-postit-red hover:brightness-95 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-red-900">priority_high</span>
                    </button>
                    <button className="size-12 rounded-xl flex items-center justify-center bg-postit-yellow hover:brightness-95 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-yellow-900">bolt</span>
                    </button>
                    <button className="size-12 rounded-xl flex items-center justify-center bg-postit-green hover:brightness-95 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-green-900">done_all</span>
                    </button>
                </div>
            </main>

            {/* New Task Modal */}
            {showNewTaskModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-md p-8 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowNewTaskModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-2xl font-bold text-[#0c141d] dark:text-white mb-6">Create New Task</h2>

                        <form onSubmit={handleCreateTask} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="text-sm font-bold text-[#0c141d] dark:text-slate-200 mb-2 block">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    value={newTask.titulo}
                                    onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
                                    className="w-full px-4 h-12 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all"
                                    placeholder="e.g., Finish project proposal"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-bold text-[#0c141d] dark:text-slate-200 mb-2 block">
                                    Description
                                </label>
                                <textarea
                                    value={newTask.descripcion}
                                    onChange={(e) => setNewTask({ ...newTask, descripcion: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all resize-none"
                                    placeholder="Add details about this task..."
                                    rows="3"
                                    required
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="text-sm font-bold text-[#0c141d] dark:text-slate-200 mb-2 block">
                                    Priority
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setNewTask({ ...newTask, prioridad: 'ALTA' })}
                                        className={`flex-1 h-12 rounded-lg font-semibold transition-all ${
                                            newTask.prioridad === 'ALTA'
                                                ? 'bg-postit-red text-red-950 scale-105'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                                        }`}
                                    >
                                        High
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewTask({ ...newTask, prioridad: 'MEDIA' })}
                                        className={`flex-1 h-12 rounded-lg font-semibold transition-all ${
                                            newTask.prioridad === 'MEDIA'
                                                ? 'bg-postit-yellow text-yellow-950 scale-105'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                                        }`}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewTask({ ...newTask, prioridad: 'BAJA' })}
                                        className={`flex-1 h-12 rounded-lg font-semibold transition-all ${
                                            newTask.prioridad === 'BAJA'
                                                ? 'bg-postit-green text-green-950 scale-105'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                                        }`}
                                    >
                                        Low
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full h-12 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-6"
                            >
                                <span className="material-symbols-outlined">add_task</span>
                                <span>Create Task</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;