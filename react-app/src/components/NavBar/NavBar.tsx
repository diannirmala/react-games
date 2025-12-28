import "./navbar.css";

type Props = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
};

export function NavBar({ darkMode, onToggleDarkMode, searchValue, onSearchChange }: Props) {
  return (
    <header className="navbar">
      <div className="brand" aria-label="brand">
        <div className="logo">🎮</div>
      </div>

      <div className="search">
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search games..."
        />
      </div>

      <button className="toggle" onClick={onToggleDarkMode} aria-label="toggle dark mode">
        <span className="dot" data-on={darkMode} />
        <span>{darkMode ? "Dark" : "Light"} Mode</span>
      </button>
    </header>
  );
}
