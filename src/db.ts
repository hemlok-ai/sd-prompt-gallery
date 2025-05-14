import Dexie, { Table } from 'dexie';
import { Prompt, Tag } from './types';

export class PromptDatabase extends Dexie {
  prompts!: Table<Prompt>;
  tags!: Table<Tag>;

  constructor() {
    super('PromptDictionary');
    this.version(2).stores({
      prompts: '++id, image, title, positivePrompt, negativePrompt, settings, memo, tags, tool, createdAt',
      tags: '++id, name',
    });
  }
}

const db = new PromptDatabase();
export default db;