export interface Prompt {
  id?: number;
  image: string;
  title: string;
  positivePrompt: string;
  negativePrompt: string;
  settings: string;
  memo: string;
  tags: string[];
  tool: 'ComfyUI' | 'AUTOMATIC1111' | 'Forge' | 'ForgeClassic' | 'other';
  createdAt: string; // ISO 8601形式の日時
}

export interface Tag {
  id?: number;
  name: string;
}