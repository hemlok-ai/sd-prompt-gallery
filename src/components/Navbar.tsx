interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setPage: (page: 'gallery' | 'edit' | 'detail') => void;
}

function Navbar({ darkMode, toggleDarkMode, setPage }: NavbarProps) {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => setPage('gallery')}
        >
          🎨SD Prompt Gallery
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => setPage('gallery')}
            className="hover:underline"
          >
            ギャラリー
          </button>
          <button
            onClick={() => setPage('edit')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            編集・追加
          </button>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded"
          >
            {darkMode ? 'ライトモード' : 'ダークモード'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;