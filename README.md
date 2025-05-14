<div align="center">

  <img src="src/assets/sd-prompt-gallery-logo.png" alt="SD Prompt Galleryロゴ" width="300">

  <h1>SD Prompt Gallery</h1>

  <span>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&style=for-the-badge" alt="React"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript&style=for-the-badge" alt="TypeScript"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?logo=tailwindcss&style=for-the-badge" alt="Tailwind CSS"></a>
    <a href="https://dexie.org"><img src="https://img.shields.io/badge/Dexie.js-4.0.8-FFD700?logo=javascript&style=for-the-badge" alt="Dexie.js"></a>
    <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-5.4.8-646CFF?logo=vite&style=for-the-badge" alt="Vite"></a>
    <a href="https://github.com/<your-username>/sd-prompt-gallery/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
  </span>

</div>

## 概要
- SD Prompt Gallery は、画像生成AIのプロンプト管理・表示するための React ベースアプリケーションです。
- TypeScript、Tailwind CSS、Dexie.js を使用して構築されており、ローカル環境で軽量かつ高速に動作します。

## 機能
- プロンプトの追加、編集、削除
- 画像付きプロンプトのギャラリー表示（通常/拡大表示のトグル）
- タイトル、プロンプト、タグ、ツールによる検索・フィルタリング
- タイトルや登録日時でのソート
- ダークモード対応
- IndexedDB（Dexie.js）を用いたローカルストレージ
- データのエクスポート/インポート
- レスポンシブデザイン

## インストール
1. リポジトリをクローン：
   ```bash
   git clone https://github.com/hemlok-ai/sd-prompt-gallery.git
   cd sd-prompt-gallery
   ```
2. 依存関係をインストール：
   ```bash
   npm install
   ```
3. 開発サーバーを起動：
   ```bash
   npm run dev
   ```

## 使用方法

[カスタム等詳しい使い方はこちら](src/docs/usage-and-customization.md)

- ブラウザで `http://localhost:5173` にアクセス。
- 「編集・追加」ページでプロンプトを登録（画像はドラッグ＆ドロップまたはクリックで追加）。
- ギャラリーページでプロンプトを閲覧、検索、ソート。
- 拡大表示トグルで画像を大きく表示。
- データのエクスポート/インポートでバックアップ。

## ライセンス
このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。

## 開発者
- Hemlok（ [GitHub](https://github.com/hemlok-ai) / [X](https://x.com/Hemlok_SD) / [Hugging Face](https://huggingface.co/Hemlok) ）

## コントリビューション
バグ報告や機能提案は [Issues](https://github.com/hemlok-ai/sd-prompt-gallery/issues) まで。