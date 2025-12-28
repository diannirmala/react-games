import { Genre } from "../../types";
import "./aside.css";

type Props = {
  genres: Genre[];
  selectedGenreId: number | null;
  onSelectGenre: (id: number | null) => void;
};

export function Aside({ genres, selectedGenreId, onSelectGenre }: Props) {
  return (
    <aside className="aside">
      <h3>Genres</h3>

      <button
        className={selectedGenreId === null ? "genre active" : "genre"}
        onClick={() => onSelectGenre(null)}
      >
        All
      </button>

      <div className="genre-list">
        {genres.map((g) => (
          <button
            key={g.id}
            className={selectedGenreId === g.id ? "genre active" : "genre"}
            onClick={() => onSelectGenre(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
