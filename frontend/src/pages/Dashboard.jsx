import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // LocalStorage se user info nikalna
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        } else {
            navigate('/login'); // Agar login nahi hai toh login page par bhej do
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newProject = {
            id: Date.now(),
            title,
            description,
        };
        setProjects([newProject, ...projects]);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Top Navigation Bar */}
            <nav className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
                        T
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        TaskFlow Pro
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-300">Welcome back,</p>
                        <p className="text-base font-bold text-indigo-400">{user?.name || 'Galaxy'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Hero Greeting Card */}
                <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-800/50 border border-indigo-500/20 rounded-3xl p-8 mb-10 shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                        Hello, <span className="text-indigo-400">{user?.name || 'User'}</span> 👋
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Manage your projects efficiently and track your daily goals in style.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Project Form Card */}
                    <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 shadow-xl backdrop-blur-md h-fit">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <span className="h-3 w-3 bg-indigo-500 rounded-full animate-pulse"></span>
                            <span>Create New Project</span>
                        </h2>

                        <form onSubmit={handleAddProject} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., MERN E-Commerce"
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief summary of the project..."
                                    rows="3"
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 transform active:scale-[0.98]"
                            >
                                Add Project
                            </button>
                        </form>
                    </div>

                    {/* Projects List Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
                            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full">
                                {projects.length} Total
                            </span>
                        </div>

                        {projects.length === 0 ? (
                            <div className="bg-slate-800/20 border border-dashed border-slate-700 rounded-3xl p-12 text-center">
                                <div className="text-4xl mb-3">📂</div>
                                <h3 className="text-lg font-semibold text-slate-300 mb-1">No projects yet</h3>
                                <p className="text-slate-500 text-sm">Create your first project using the form on the left.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {projects.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 hover:border-indigo-500/40 transition-all shadow-lg flex flex-col justify-between group"
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors mb-2">
                                                {proj.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm line-clamp-2">
                                                {proj.description || 'No description provided.'}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-700/50">
                                            <span className="text-xs text-slate-500 font-medium">Active</span>
                                            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                                                In Progress
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;