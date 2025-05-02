"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getTourById } from "../api/toursApi"
import type { TourType } from "../types"
import { MapPin, ChevronLeft } from "lucide-react"

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [tour, setTour] = useState<TourType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTour = async () => {
      if (!id) return

      try {
        const tourData = await getTourById(id)
        console.log(tourData)
        if (tourData) {
          setTour(tourData as TourType)
        }
      } catch (error) {
        console.error("Error loading tour details:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTour()
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-display font-bold text-paris-blue-900 mb-4">Tour Not Found</h1>
          <p className="mb-8">The tour you are looking for does not exist or has been removed.</p>
          <Link to="/tours" className="btn btn-primary">
            Browse All Tours
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="h-96 bg-cover bg-center pt-32"
        style={{
          backgroundImage: `linear-gradient(rgba(5, 20, 65, 0.7), rgba(5, 30, 80, 0.5)), url(${tour.image})`,
        }}
      >
        <div className="container-custom h-full flex flex-col justify-end pb-8 text-white">
          <Link to="/tours" className="flex items-center text-white mb-4 hover:text-paris-gold-500 transition-colors">
            <ChevronLeft size={20} className="mr-1" /> Back to all tours
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{tour.name}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" /> {tour.category}
            </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Tour Description and Details */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-display font-bold text-paris-blue-900 mb-4">Tour Overview</h2>
                <p className="text-gray-700 mb-8 whitespace-pre-line">
                  {tour.description.split('<br />').map((text, index) => (
                    <div key={index}>
                      {text}
                      {/* {text.at(-1) === '.' ? '' : '.'} */}
                      <br />
                    </div>
                  ))}
                </p>
              </div>
            </div>

            {/* Booking Panel */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-display font-bold text-paris-blue-900">Book this Tour</h3>
                  <div className="text-2xl font-bold text-paris-blue-900">${tour.price.toFixed(2)}</div>
                </div>

                <a
                  href={tour.affLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-md font-medium text-center transition-colors bg-paris-gold-500 hover:bg-paris-gold-600 text-paris-blue-900"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TourDetails
