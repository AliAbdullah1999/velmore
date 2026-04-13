import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: max }, (_, index) => {
        const i = index + 1;
        return (
          <Star
            key={index}
            size={16}
            className={
              i <= fullStars
                ? "fill-current"
                : i === fullStars + 1 && hasHalf
                ? "fill-current/70"
                : "text-zinc-300"
            }
          />
        );
      })}
      <span className="ml-2 text-sm font-medium text-zinc-600">{rating.toFixed(1)}</span>
    </div>
  );
}
