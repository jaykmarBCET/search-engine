import { Card, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SearchResult } from "@/types/types"
import { useState } from "react"
import ReadMe from 'react-markdown'

type Props = {
  result: SearchResult
}

function SearchResultCard({ result }: Props) {
  const [showFavicon, setShowFavicon] = useState(true);

  // Use Google's Favicon API to get the icon from the URL
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${result.url}`;

  return (
    <Card className="w-full bg-gray-950 text-white rounded-xl shadow-lg transition-all duration-200 border border-gray-800 hover:border-blue-500/50 hover:shadow-xl">
      <div className="p-5 flex flex-col gap-3">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          {showFavicon && (
            <img
              src={faviconUrl}
              alt="favicon"
              className="w-5 h-5 rounded-full border border-gray-700"
              onError={() => setShowFavicon(false)}
            />
          )}
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm text-gray-400 font-medium truncate">
              
              {result.url.replace(/^(https?:\/\/)?(www\.)?/i, "").split('/')[0]}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-2">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="block">
            <CardTitle className="text-xl font-semibold text-blue-300 hover:text-blue-500 transition-colors duration-200 leading-snug">
              {result.title}
            </CardTitle>
          </a>
          <p className="text-base text-gray-300 leading-relaxed line-clamp-3">
            <ReadMe>
            {result.content}

            </ReadMe>
          </p>
        </div>

        {/* Footer/Badges */}
        <div className="flex justify-end mt-2">
          <Badge className="bg-blue-600/20 text-blue-400 text-xs font-mono px-2 py-1 rounded-sm">
            Score: {result.score.toFixed(2)}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default SearchResultCard