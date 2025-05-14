import React, { useState } from 'react';
import { Prompt } from '../types';
import TagSelector from './TagSelector';

interface EditProps {
  form: Prompt;
  setForm: (form: Prompt) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingId: number | null;
}

function Edit({ form, setForm, handleSubmit, editingId }: EditProps) {
  const [rawTags, setRawTags] = useState(form.tags.join(', '));
  const [dragActive, setDragActive] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({
        ...form,
        image: reader.result as string,
        title: form.title || file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImage(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImage(file);
    }
  };

  const handleTagsInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRawTags(value);
    const tags = value
      .replace(/、/g, ',')
      .split(/[, \n]+/)
      .map((t) => t.trim())
      .filter((t) => t);
    setForm({ ...form, tags });
  };

  const handleTagSelect = (tags: string[]) => {
    setForm({ ...form, tags });
    setRawTags(tags.join(', '));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{editingId ? 'プロンプト編集' : 'プロンプト追加'}</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 dark:text-white">画像（ドラッグ＆ドロップまたはクリックで選択）</label>
            <div
              className={`border-2 border-dashed p-4 rounded ${dragActive ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-300'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="imageInput"
              />
              <label htmlFor="imageInput" className="cursor-pointer block text-center dark:text-white">
                {form.image ? '別の画像を選択' : '画像をここにドロップまたはクリックして選択'}
              </label>
            </div>
            {form.image && <img src={form.image} alt="Preview" className="mt-2 max-w-xs" />}
          </div>
          <div>
            <label className="block mb-1 dark:text-white">タイトル</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInput}
              placeholder="タイトル（未入力の場合、画像ファイル名）"
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <label className="block mb-1 mt-2 dark:text-white">ポジティブプロンプト</label>
            <textarea
              name="positivePrompt"
              value={form.positivePrompt}
              onChange={handleInput}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <label className="block mb-1 mt-2 dark:text-white">ネガティブプロンプト</label>
            <textarea
              name="negativePrompt"
              value={form.negativePrompt}
              onChange={handleInput}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <label className="block mb-1 mt-2 dark:text-white">設定</label>
            <textarea
              name="settings"
              value={form.settings}
              onChange={handleInput}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <label className="block mb-1 mt-2 dark:text-white">メモ</label>
            <textarea
              name="memo"
              value={form.memo}
              onChange={handleInput}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <label className="block mb-1 mt-2 dark:text-white">タグ（カンマ、スペース、改行で区切る）</label>
            <textarea
              value={rawTags}
              onChange={handleTagsInput}
              placeholder="例: tag1, tag2, tag3"
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            />
            <TagSelector selectedTags={form.tags} setSelectedTags={handleTagSelect} />
            <label className="block mb-1 mt-2 dark:text-white">ツール</label>
            <select
              name="tool"
              value={form.tool}
              onChange={handleInput}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="ComfyUI">ComfyUI</option>
              <option value="AUTOMATIC1111">AUTOMATIC1111</option>
              <option value="Forge">Forge</option>
              <option value="ForgeClassic">ForgeClassic</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? '更新' : '追加'}
        </button>
      </form>
    </div>
  );
}

export default Edit;