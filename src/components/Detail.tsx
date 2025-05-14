import { useState, useEffect } from 'react';
import { Prompt } from '../types';
import db from '../db';

interface DetailProps {
  id: number;
  setPage: (page: 'gallery' | 'edit' | 'detail') => void;
}

function Detail({ id, setPage }: DetailProps) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [copiedPositive, setCopiedPositive] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);

  useEffect(() => {
    db.prompts.get(id).then((data) => setPrompt(data || null));
  }, [id]);

  const copyToClipboard = (text: string, isPositive: boolean) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isPositive) {
        setCopiedPositive(true);
        setTimeout(() => setCopiedPositive(false), 2000);
      } else {
        setCopiedNegative(true);
        setTimeout(() => setCopiedNegative(false), 2000);
      }
    });
  };

  if (!prompt) {
    return <div className="container mx-auto p-4 dark:text-white">データが見つかりません</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">プロンプト詳細</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {prompt.image ? (
              <img src={prompt.image} alt="Prompt" className="max-w-xs mb-4" />
            ) : (
              <div className="max-w-xs h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 rounded">
                <span className="text-gray-500 dark:text-gray-400">画像なし</span>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold dark:text-white">タイトル</label>
            <p className="w-full p-2 dark:text-white">{prompt.title}</p>
            <label className="block mb-1 mt-2 font-bold dark:text-white">ポジティブプロンプト</label>
            <div className="flex items-center">
              <p className="w-full p-2 dark:text-white">{prompt.positivePrompt}</p>
              <button
                onClick={() => copyToClipboard(prompt.positivePrompt, true)}
                className={`ml-2 px-2 py-1 rounded text-white ${
                  copiedPositive ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                {copiedPositive ? '☑' : '📒'}
              </button>
            </div>
            <label className="block mb-1 mt-2 font-bold dark:text-white">ネガティブプロンプト</label>
            <div className="flex items-center">
              <p className="w-full p-2 dark:text-white">{prompt.negativePrompt}</p>
              <button
                onClick={() => copyToClipboard(prompt.negativePrompt, false)}
                className={`ml-2 px-2 py-1 rounded text-white ${
                  copiedNegative ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                {copiedNegative ? '☑' : '📒'}
              </button>
            </div>
            <label className="block mb-1 mt-2 font-bold dark:text-white">設定</label>
            <p className="w-full p-2 dark:text-white">{prompt.settings}</p>
            <label className="block mb-1 mt-2 font-bold dark:text-white">メモ</label>
            <p className="w-full p-2 dark:text-white">{prompt.memo}</p>
            <label className="block mb-1 mt-2 font-bold dark:text-white">タグ</label>
            <p className="w-full p-2 dark:text-white">{prompt.tags.join(', ')}</p>
            <label className="block mb-1 mt-2 font-bold dark:text-white">ツール</label>
            <p className="w-full p-2 dark:text-white">{prompt.tool}</p>
            <label className="block mb-1 mt-2 font-bold dark:text-white">登録日時</label>
            <p className="w-full p-2 dark:text-white">{new Date(prompt.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <button
          onClick={() => setPage('gallery')}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          戻る
        </button>
      </div>
    </div>
  );
}

export default Detail;