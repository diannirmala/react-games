import { Game } from "../../types";
import { LikeButton } from "../LikeButton/LikeButton";
import "./gamecard.css";

type Props = {
  game: Game;
  liked: boolean;
  onToggleLike: () => void;
};

function platformIcon(p: string) {
  const map: Record<string, string> = {
    pc: "🖥️",
    playstation: "🎮",
    xbox: "❎",
    nintendo: "🔺",
    ios: "📱",
    android: "🤖",
  };
  return map[p] ?? "•";
}

export function GameCard({ game, liked, onToggleLike }: Props) {
  return (
    <article className="card">
      <div className="cover">
        <img src={game.background_image} alt={game.name} loading="lazy" />
      </div>

      <div className="card-body">
        <div className="meta">
          <div className="platforms">
            {game.platforms.slice(0, 6).map((p) => (
              <span key={p} title={p}>
                {platformIcon(p)}
              </span>
            ))}
          </div>

          {typeof game.metacritic === "number" && (
            <span className="score">{game.metacritic}</span>
          )}
        </div>

        <h4 className="title">{game.name}</h4>

        <div className="actions">
          <LikeButton liked={liked} onClick={onToggleLike} />
        </div>
      </div>
    </article>
  );
}
