import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MovieResult } from "@/types/types"

type Props = {
  movie: MovieResult
}

function MovieCard({ movie }: Props) {
  return (
    <Card className="w-72 bg-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-primary/50">
      {/* Poster with Gradient Overlay */}
      <div className="relative w-full h-96">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Release Year Badge */}
        <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {movie.release_date?.split("-")[0] || "N/A"}
        </span>
      </div>

      {/* Content */}
      <CardHeader className="p-4 pt-2">
        <CardTitle className="text-lg font-bold line-clamp-1">{movie.title}</CardTitle>
        
        {/* Rating and Votes */}
        <div className="flex items-center gap-2 mt-1">
          <Badge className="bg-yellow-500 text-black font-semibold text-xs px-2 py-1 rounded-full">
            ⭐ {movie.vote_average.toFixed(1)}
          </Badge>
          <span className="text-gray-400 text-xs">
            ({movie.vote_count} votes)
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {/* Overview */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300 line-clamp-4 leading-relaxed">{movie.overview}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MovieCard