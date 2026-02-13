
import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ICONS } from './constants';
import { Project, OrderStatus, GlassType } from './types';
import Dashboard from './views/Dashboard';
import ProjectsList from './views/ProjectsList';
import ProjectDetails from './views/ProjectDetails';
import MeasurementForm from './views/MeasurementForm';
import NovaMedicao from './views/NovaMedicao';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="bg-indigo-700 text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
        <h1 className="text-xl font-bold tracking-tight">Lavidrac <span className="text-indigo-200 font-normal">SaaS</span></h1>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">LV</div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50">
        {children}
      </main>

      <nav className="bg-white border-t border-slate-200 flex justify-around py-2 px-4 shadow-lg z-50 shrink-0">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <ICONS.Dashboard />
          <span className="text-[10px] font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
          <ICONS.Project />
          <span className="text-[10px] font-medium">Projetos</span>
        </NavLink>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <ICONS.Camera />
          <span className="text-[10px] font-medium">Câmera</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <ICONS.Settings />
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1001',
      clientName: 'Carlos Alberto - Ed. Safira',
      address: 'Rua das Orquídeas, 402, São Paulo',
      status: OrderStatus.MEASURING,
      pieces: [],
      vaos: [],
      createdAt: new Date().toISOString()
    },
    {
      id: '1002',
      clientName: 'Maria Helena (Obra Ipiranga)',
      address: 'Rua Agostinho Gomes, 1200, São Paulo',
      status: OrderStatus.BUDGETING,
      pieces: [
        { id: 'p1', label: 'Janela Cozinha', width: 1200, height: 1000, thickness: 8, type: GlassType.TEMPERED, color: 'Incolor', hardwareIds: [] }
      ],
      vaos: [],
      createdAt: new Date().toISOString(),
      totalValue: 850.00
    }
  ]);

  const updateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard projects={projects} />} />
          <Route path="/projects" element={<ProjectsList projects={projects} />} />
          <Route path="/projects/:id" element={<ProjectDetails projects={projects} onUpdate={updateProject} />} />
          <Route path="/projects/:id/add-piece" element={<MeasurementForm projects={projects} onUpdate={updateProject} />} />
          <Route path="/nova-medicao" element={<NovaMedicao onAddProject={addProject} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
