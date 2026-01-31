import React, { useState } from 'react';
import { registerUser } from '../service/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validación de contraseñas
        if (contrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (contrasena.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({ nombre, email, password: contrasena });
            // Mostrar mensaje de éxito
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Error en el registro. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen relative overflow-hidden flex flex-col items-center justify-center whiteboard-texture">
            {/* Decorative Eraser (Top Left) */}
            <div className="absolute -top-10 -left-10 w-48 h-32 bg-slate-200 dark:bg-slate-800 rounded-xl shadow-lg border-b-8 border-slate-300 dark:border-slate-900 rotate-12 opacity-80 hidden lg:block">
                <div className="w-full h-1/2 bg-blue-100/50 dark:bg-blue-900/20 rounded-t-xl border-b border-slate-300"></div>
                <div className="p-4 text-slate-400 dark:text-slate-600 font-bold text-xs uppercase tracking-widest">
                    Whiteboard Pro
                </div>
            </div>

            {/* Decorative Marker (Bottom Right) */}
            <div className="absolute bottom-10 right-10 rotate-[-15deg] hidden lg:block">
                <div className="marker-body w-48 h-8 rounded-full shadow-md relative">
                    <div className="absolute left-0 top-0 w-4 h-full bg-primary rounded-l-full"></div>
                    <div className="absolute right-4 top-1 w-12 h-6 bg-slate-100/20 rounded-sm"></div>
                    <div className="absolute -right-2 top-0 w-8 h-8 bg-slate-700 rounded-r-full border-l border-slate-900"></div>
                </div>
            </div>

            {/* Navigation */}
            <header className="absolute top-0 left-0 w-full px-10 py-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-[#0c141d] dark:text-slate-100 text-xl font-bold tracking-tight">
                        Gestor de Tareas
                    </h2>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center p-4 w-full max-w-4xl">
                {/* Register Card */}
                <div className="tilted-card relative bg-white dark:bg-zinc-900 p-8 md:p-12 w-full max-w-[480px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl border border-slate-200 dark:border-zinc-800">
                    {/* Pin Head */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 size-8 bg-green-500 rounded-full shadow-inner flex items-center justify-center">
                        <div className="size-2 bg-green-300 rounded-full opacity-50"></div>
                    </div>

                    {/* Title */}
                    <div className="mb-8 text-center">
                        <div className="relative inline-block">
                            <h1 className="text-3xl font-bold text-[#0c141d] dark:text-white mb-2 relative z-10">
                                Únete a nuestra comunidad
                            </h1>
                            <div className="absolute bottom-1 left-0 w-full h-3 bg-highlighter dark:bg-yellow-900/40 -z-0 opacity-70"></div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Comienza a organizar tus tareas hoy
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label className="text-[#0c141d] dark:text-slate-200 text-sm font-bold mb-2 ml-1">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    person
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-slate-400"
                                    placeholder="John Doe"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
                            <label className="text-[#0c141d] dark:text-slate-200 text-sm font-bold mb-2 ml-1">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    alternate_email
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-slate-400"
                                    placeholder="name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col">
                            <label className="text-[#0c141d] dark:text-slate-200 text-sm font-bold mb-2 ml-1">
                                Contraseña
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    lock
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col">
                            <label className="text-[#0c141d] dark:text-slate-200 text-sm font-bold mb-2 ml-1">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    lock_reset
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    type="password"
                                    value={confirmarContrasena}
                                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full h-14 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span className="truncate">
                                {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                            </span>
                            {!isLoading && (
                                <span className="material-symbols-outlined">how_to_reg</span>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            ¿Ya tienes una cuenta?
                            <a className="text-primary font-bold hover:underline ml-1" href="/login">
                                Inicia sesión aquí
                            </a>
                        </p>
                    </div>
                </div>

                {/* Background Icon Decoration */}
                <div className="fixed inset-0 pointer-events-none -z-10 flex flex-wrap gap-20 p-20 opacity-[0.03] dark:opacity-[0.05]">
                    <span className="material-symbols-outlined text-9xl">task_alt</span>
                    <span className="material-symbols-outlined text-9xl">calendar_today</span>
                    <span className="material-symbols-outlined text-9xl">sticky_note_2</span>
                    <span className="material-symbols-outlined text-9xl">draw</span>
                    <span className="material-symbols-outlined text-9xl">push_pin</span>
                    <span className="material-symbols-outlined text-9xl">checklist</span>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-8 left-0 w-full px-10 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 font-bold">
                <div>V1.0</div>
            </footer>
        </div>
    );
}

export default Register;