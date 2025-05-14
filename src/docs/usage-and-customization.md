# SD Prompt Gallery 使用方法とカスタマイズガイド

- このドキュメントでは、SD Prompt Gallery の基本的な使用方法と、カスタマイズ方法について説明します。
- SD Prompt Gallery は、AI 生成プロンプトと画像を管理・表示するためのアプリケーションです。

## 1. 使用方法

### 1.1 アプリの起動
1. リポジトリをクローンし、依存関係をインストール：
   ```bash
   git clone https://github.com/hemlok-ai/sd-prompt-gallery.git
   cd sd-prompt-gallery
   npm install
   ```
2. 開発サーバーを起動：
   ```bash
   npm run dev
   ```
3. ブラウザで `http://localhost:5173` にアクセス。

### 1.2 プロンプトの追加
1. ナビゲーションバーの「編集・追加」ボタンをクリック。
2. 以下のフィールドを入力：
   - **画像**：ドラッグ＆ドロップまたはクリックで画像を選択。未入力の場合、タイトルに画像ファイル名が自動設定。
   - **タイトル**：プロンプトの名前（例：「1girl」）。
   - **ポジティブプロンプト**：生成に使用するプロンプト（例：「1girl, solo, long hair」）。
   - **ネガティブプロンプト**：除外する要素（例：「blurry, low quality」）。
   - **設定**：生成ツールの設定（例：「steps: 50, CFG: 7」）。
   - **メモ**：追加のメモ（例：「夕暮れの雰囲気」）。
   - **タグ**：カンマ区切りで入力（例：「1girl, solo, original」）。
   - **ツール**：使用ツールを選択（例：ComfyUI, AUTOMATIC1111）。
3. 「追加」または「更新」ボタンをクリック。

### 1.3 ギャラリーの閲覧
- **ギャラリーページ**：
  - 画像クリックで詳細ページへ飛びます。
- **表示モード**：
  - 「通常表示」（画像高さ 128px）と「拡大表示」（画像高さ 320px）をトグル。
  - 拡大表示はカードを縦に伸ばし、3列グリッドを維持。
- **クリック操作**：
  - 画像またはプレースホルダーをクリックで詳細ページへ。
  - 「編集」ボタンで編集ページへ。
  - 「削除」ボタンでプロンプトを削除（確認なしで即削除）。

### 1.4 検索とフィルタリング
- **検索**：
  - 検索バーにキーワードを入力（タイトル、プロンプト、メモ、タグ、ツールを対象）。
  - 例：「1girl」で検索 → 関連プロンプトを表示。
- **タグフィルタ**：
  - タグ入力欄にカンマ区切りでタグを入力（例：「1girl, solo」）。
  - 指定したタグをすべて含むプロンプトを表示。
- **ソート**：
  - ドロップダウンで「タイトル」または「登録日時」を選択。
  - 昇順/降順を切り替え。

### 1.5 詳細ページ
- プロンプトの詳細（画像、タイトル、プロンプト、設定、メモ、タグ、ツール、登録日時）を表示。
- **コピーボタン**：
  - ポジティブ/ネガティブプロンプトの横に「📒」ボタン。
  - クリックでクリップボードにコピー、成功時は「☑」に変化（2秒後に戻る）。
- 「戻る」ボタンでギャラリーへ。

### 1.6 データのバックアップと復元
- **エクスポート**：
  - ギャラリーページの「データエクスポート」ボタンをクリック。
  - プロンプトとタグを JSON ファイル（例：`prompt-dictionary-backup-<date>.json`）でダウンロード。
- **インポート**：
  - 「データインポート」ボタンで JSON ファイルを選択。
  - 既存データを上書きして復元。

### 1.7 ダークモード
- ナビゲーションバーの「ダークモード」/「ライトモード」ボタンで切り替え。

## 2. カスタマイズ方法

SD Prompt Gallery は柔軟にカスタマイズ可能です。以下は一般的なカスタマイズ例です。

### 2.1 テーマのカスタマイズ
- **カラー変更**：
  - `src/styles.css` や `tailwind.config.ts` で Tailwind CSS のカラーを変更。
  - 例：ナビバーの背景色を青に変更：
    ```css
    .bg-gray-800 {
      background-color: #1e40af; /* ダークブルー */
    }
    ```
  - または、`tailwind.config.ts` でカスタムカラーを定義：
    ```ts
    module.exports = {
      theme: {
        extend: {
          colors: {
            'custom-dark': '#1e40af',
          },
        },
      },
    };
    ```
    - 使用例：`<nav className="bg-custom-dark ...">`。

- **ダークモードの調整**：
  - ダークモードの配色を変更（例：背景を黒に）：
    ```css
    .dark .bg-gray-900 {
      background-color: #000000;
    }
    ```

### 2.2 ギャラリーの画像サイズ変更
- **通常/拡大表示の高さ**：
  - `src/components/Gallery.tsx` の `h-32`（通常）や `h-80`（拡大）を変更：
    ```tsx
    className={`w-full ${displayMode === 'normal' ? 'h-40' : 'h-96'} object-contain ...`}
    ```
    - `h-40`（160px）、`h-96`（384px）に変更例。
- **動的なサイズ調整**：
  - スライダーで高さを変更：
    ```tsx
    const [imageHeight, setImageHeight] = useState(32); // 初期値 128px
    // コントロールを追加
    <input
      type="range"
      min="16"
      max="128"
      value={imageHeight}
      onChange={(e) => setImageHeight(Number(e.target.value))}
      className="w-32"
    />
    // 画像の高さ
    className={`w-full h-${displayMode === 'normal' ? imageHeight : imageHeight * 2} object-contain ...`}
    ```

### 2.3 グリッドレイアウトの変更
- **列数の変更**：
  - `src/components/Gallery.tsx` のグリッドを調整：
    ```tsx
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    ```
    - 中画面で3列、大画面で4列に変更。
- **モバイル対応**：
  - モバイルでカード幅を拡大：
    ```tsx
    className={`bg-white dark:bg-gray-800 p-6 rounded-lg ... ${displayMode === 'large' ? 'w-11/12 mx-auto' : ''}`}
    ```

### 2.4 追加機能の実装
- **プロンプトプレビュー**：
  - ギャラリーのタイトルにホバーでプロンプトを表示：
    ```tsx
    <p className="text-center font-bold text-lg dark:text-white" title={prompt.positivePrompt.slice(0, 50) + '...'}>
      {prompt.title}
    </p>
    ```
- **PWA 対応**：
  - Vite PWA プラグインを追加：
    ```bash
    npm install --save-dev vite-plugin-pwa
    ```
    - `vite.config.ts` を更新：
      ```ts
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import { VitePWA } from 'vite-plugin-pwa';

      export default defineConfig({
        plugins: [
          react(),
          VitePWA({
            registerType: 'autoUpdate',
            manifest: {
              name: 'SD Prompt Gallery',
              short_name: 'Prompt Gallery',
              icons: [
                { src: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
              ],
            },
          }),
        ],
        base: '/',
      });
      ```

### 2.5 データベースのカスタマイズ
- **スキーマ拡張**：
  - 新しいフィールド（例：`category`）を追加：
    ```ts
    // src/types.ts
    export interface Prompt {
      id?: number;
      title: string;
      image: string;
      positivePrompt: string;
      negativePrompt: string;
      settings: string;
      memo: string;
      tags: string[];
      tool: string;
      createdAt: string;
      category?: string; // 新規
    }