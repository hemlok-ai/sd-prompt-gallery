import React, { useState, useEffect } from 'react';
import db from '../db';
import { Tag } from '../types';

interface TagSelectorProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

function TagSelector({ selectedTags, setSelectedTags }: TagSelectorProps) {
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    db.tags.toArray().then((tags: Tag[]) => {
      setAvailableTags(tags.map((tag) => tag.name));
    });
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-2 py-1 rounded text-sm ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagSelector;