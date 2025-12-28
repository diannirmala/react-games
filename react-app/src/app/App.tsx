import { useMemo, useState } from "react";
import "../index.css";
import "./layout.css";

import { NavBar } from "../components/NavBar/NavBar";
import { Aside } from "../components/Aside/Aside";
import { GameGrid } from "../components/GameGrid/GameGrid";

import { sampleGenres } from "../data/sampleGenres";
import { sampleGames } from "../data/sampleGames";
import { Game, Platform } from "../types";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type OrderBy = "relevance" | "metacritic_desc" | "name_asc";

export default function App() {
  // 1) Theme
  const [darkMode, setDarkMode] = useState(true);

  // 2) Search (debounced supaya tidak filter di setiap ketikan)
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);

  // 3) Filters
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">("all");
  const [orderBy, setOrderBy] = useState<OrderBy>("relevance");

  // 4) Likes (Set biar cek liked O(1))
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  // 5) Filter + sort games
  const filteredGames = useMemo(() => {
    let games: Game[] = [...sampleGames];

    // Genre filter
    if (selectedGenreId !== null) {
      games = games.filter((g) => g.genreIds.includes(selectedGenreId));
    }

    // Platform filter
    if (selectedPlatform !== "all") {
      games = games.filter((g) => g.platforms.includes(selectedPlatform));
    }

    // Search filter
    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      games = games.filter((g) => g.name.toLowerCase().includes(q));
    }

    // Sorting
    if (orderBy === "metacritic_desc") {
      games.sort((a, b) => (b.metacritic ?? -1) - (a.metacritic ?? -1));
    } else if (orderBy === "name_asc") {
      games.sort((a, b) => a.name.localeCompare(b.name));
    }
    // relevance => biarkan urutan default dummy data

    return games;
  }, [debouncedSearch, selectedGenreId, selectedPlatform, orderBy]);

  // 6) Toggle like
  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={darkMode ? "theme-dark" : "theme-light"}>
      <div className="app-shell">
        <NavBar
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((v) => !v)}
          searchValue={search}
          onSearchChange={setSearch}
        />

        <div className="content-row">
          <Aside
            genres={sampleGenres}
            selectedGenreId={selectedGenreId}
            onSelectGenre={setSelectedGenreId}
          />

          <main className="main">
            <header className="main-header">
              <h1>Games</h1>

              <div className="filters">
                <label className="select">
                  <span>Order by</span>
                  <select
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value as OrderBy)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="metacritic_desc">Metacritic</option>
                    <option value="name_asc">Name</option>
                  </select>
                </label>

                <label className="select">
                  <span>Platforms</span>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as any)}
                  >
                    <option value="all">All</option>
                    <option value="pc">PC</option>
                    <option value="playstation">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                  </select>
                </label>
              </div>
            </header>

            <GameGrid
              games={filteredGames}
              likedIds={likedIds}
              onToggleLike={toggleLike}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
