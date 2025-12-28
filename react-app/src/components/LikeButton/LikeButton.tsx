type Props = {
  liked: boolean;
  onClick: () => void;
};

export function LikeButton({ liked, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="like"
      title={liked ? "Unlike" : "Like"}
      style={{
        height: 38,
        width: 44,
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        color: "var(--text)",
        cursor: "pointer",
      }}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
