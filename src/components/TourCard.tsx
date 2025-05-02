import type React from "react"
import { Link } from "react-router-dom"
import { DollarSign, Search } from "lucide-react"
import type { TourType } from "../types"

interface TourCardProps {
  tour: TourType
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Link id={tour.id} to={`/tours/${tour.id}`} className="group">
      <div className="w-full h-full flex flex-col overflow-hidden transform transition-all duration-300 group-hover:translate-y-[-5px]">
        <div className="relative overflow-hidden h-[200px] sm:h-[250px]">
          <img
            src={tour.image || "/placeholder.svg"}
            alt={tour.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-paris-gold-500 text-paris-blue-900 font-bold px-4 py-2 text-sm">
            {tour.category}
          </div>
        </div>

        <div className="flex-grow p-4 sm:p-5 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-paris-blue-900 mb-2 group-hover:text-paris-red-500 transition-colors line-clamp-2">
            {tour.name}
          </h3>

          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
            {tour.description.replace(/<br\s*\/?>/g, ' ')}
          </p>

          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center text-gray-600 text-sm">
              <Search size={16} className="mr-1" /> {tour.category}
            </div>
            <div className="font-bold text-paris-blue-900 flex items-center">
              <DollarSign size={16} className="mr-1" />
              {tour.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TourCard
