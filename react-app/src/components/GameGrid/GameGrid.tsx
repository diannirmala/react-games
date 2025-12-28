import { Game } from "../../types";
import { GameCard } from "../GameCard/GameCard";
import "./gamegrid.css";

type Props = {
  games: Game[];
  likedIds: Set<number>;
  onToggleLike: (id: number) => void;
};

export function GameGrid({ games, likedIds, onToggleLike }: Props) {
  return (
    <section className="grid" aria-label="games grid">
      {games.map((g) => (
        <GameCard
          key={g.id}
          game={g}
          liked={likedIds.has(g.id)}
          onToggleLike={() => onToggleLike(g.id)}
        />
      ))}
    </section>
  );
}
