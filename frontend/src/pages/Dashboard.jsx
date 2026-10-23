import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchProjects();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await API.post('/projects', { title, description });
            setTitle('');
            setDescription('');
            fetchProjects();
        } catch (error) {
            alert('Failed to create project');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
                    <h1 className="text-xl font-bold text-gray-800">Welcome, {userInfo?.name}</h1>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>

                {/* Create Project Form */}
                <form onSubmit={handleCreateProject} className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Project
                    </button>
                </form>

                {/* Projects List */}
                <h2 className="text-xl font-bold mb-4">Your Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-bold text-blue-600 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">Owner: {project.owner?.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}