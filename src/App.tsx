import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Edit from './components/Edit';
import Detail from './components/Detail';
import { Prompt } from './types';
import db from './db';

function App() {
  const [page, setPage] = useState<'gallery' | 'edit' | 'detail'>('gallery');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [form, setForm] = useState<Prompt>({
    title: '',
    image: '',
    positivePrompt: '',
    negativePrompt: '',
    settings: '',
    memo: '',
    tags: [],
    tool: 'ComfyUI',
    createdAt: new Date().toISOString(),
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    db.prompts.toArray().then(setPrompts);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await db.prompts.update(editingId, form);
    } else {
      await db.prompts.add({ ...form, createdAt: new Date().toISOString() });
    }
    setPrompts(await db.prompts.toArray());
    setPage('gallery');
    setForm({
      title: '',
      image: '',
      positivePrompt: '',
      negativePrompt: '',
      settings: '',
      memo: '',
      tags: [],
      tool: 'ComfyUI',
      createdAt: new Date().toISOString(),
    });
    setEditingId(null);
  };

  const handleEdit = (prompt: Prompt) => {
    setForm(prompt);
    setEditingId(prompt.id!);
    setPage('edit');
  };

  const handleDelete = async (id: number) => {
    await db.prompts.delete(id);
    setPrompts(await db.prompts.toArray());
  };

  const handleView = (id: number) => {
    setDetailId(id);
    setPage('detail');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} setPage={setPage} />
        {page === 'gallery' && (
          <Gallery
            prompts={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
            search={search}
            setSearch={setSearch}
            tags={tags}
            setTags={setTags}
          />
        )}
        {page === 'edit' && (
          <Edit
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editingId={editingId}
          />
        )}
        {page === 'detail' && detailId && <Detail id={detailId} setPage={setPage} />}
      </div>
    </div>
  );
}

export default App;