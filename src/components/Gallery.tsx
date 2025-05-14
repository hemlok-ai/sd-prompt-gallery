import React, { useState, useEffect } from 'react';
import { Prompt } from '../types';
import db from '../db';

interface GalleryProps {
  prompts: Prompt[];
  handleEdit: (prompt: Prompt) => void;
  handleDelete: (id: number) => void;
  handleView: (id: number) => void;
  search: string;
  setSearch: (search: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

function Gallery({ prompts, handleEdit, handleDelete, handleView, search, setSearch, tags, setTags }: GalleryProps) {
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts);
  const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [displayMode, setDisplayMode] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    let results = [...prompts];
    if (search) {
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.positivePrompt.toLowerCase().includes(search.toLowerCase()) ||
          p.negativePrompt.toLowerCase().includes(search.toLowerCase()) ||
          p.memo.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
          p.tool.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (tags.length > 0) {
      results = results.filter((p) => tags.every((tag) => p.tags.includes(tag)));
    }
    results.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return sortOrder === 'asc'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      }
    });
    setFilteredPrompts(results);
  }, [search, tags, prompts, sortBy, sortOrder]);

  const exportData = async () => {
    const promptsData = await db.prompts.toArray();
    const tagsData = await db.tags.toArray();
    const backup = { prompts: promptsData, tags: tagsData };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-dictionary-backup-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('データをエクスポートしました。');
  };

  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string);
        if (!backup.prompts || !Array.isArray(backup.prompts) || !backup.tags || !Array.isArray(backup.tags)) {
          throw new Error('無効なバックアップ形式です。');
        }
        await db.prompts.clear();
        await db.tags.clear();
        await db.prompts.bulkAdd(backup.prompts);
        await db.tags.bulkAdd(backup.tags);
        const newPrompts = await db.prompts.toArray();
        setFilteredPrompts(newPrompts);
        alert('データを復元しました。');
      } catch (error: any) {
        alert(`データのインポートに失敗しました: ${error.message}`);
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="検索（タイトル、プロンプト、メモ、タグ、ツール）"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-2 rounded dark:bg-gray-700 dark:text-white focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="タグ（カンマ区切り）"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value.split(',').map((t: string) => t.trim()).filter((t: string) => t))
          }
          className="w-full md:w-1/2 border p-2 rounded dark:bg-gray-700 dark:text-white focus:border-blue-500"
        />
      </div>
      <div className="mb-4 flex gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'createdAt')}
          className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="title">タイトル</option>
          <option value="createdAt">登録日時</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>
        <button
          onClick={() => setDisplayMode(displayMode === 'normal' ? 'large' : 'normal')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {displayMode === 'normal' ? '🔍 拡大表示' : '🔙 通常表示'}
        </button>
        <button
          onClick={exportData}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          データエクスポート
        </button>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          データインポート
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt: Prompt) => (
          <div
            key={prompt.id}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition-shadow ${
              displayMode === 'large' ? 'pb-8' : ''
            }`}
          >
            {prompt.image ? (
              <img
                src={prompt.image}
                alt={prompt.title}
                className={`w-full ${displayMode === 'normal' ? 'h-32' : 'h-80'} object-contain mb-4 rounded cursor-pointer bg-gray-100 dark:bg-gray-700`}
                onClick={() => handleView(prompt.id!)}
              />
            ) : (
              <div
                className={`w-full ${displayMode === 'normal' ? 'h-32' : 'h-80'} bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 rounded cursor-pointer`}
                onClick={() => handleView(prompt.id!)}
              >
                <span className="text-gray-500 dark:text-gray-400">画像なし</span>
              </div>
            )}
            <p className="text-center font-bold text-lg dark:text-white">{prompt.title}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => handleEdit(prompt)}
                className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(prompt.id!)}
                className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;