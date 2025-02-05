'use client'

import { useState, useEffect } from 'react'

type Publication = {
  title: string
  abstract: string
  authors: string
  publication_type: string
  journal: string
  conference: string
  year: number
  doi: string
  url: string
  pdf_link: string
  id: number
  is_org: boolean
  poster: string
}

const publicationTypes = [
  { id: 'all', name: 'All Publications' },
  { id: 'journal', name: 'Journal Articles' },
  { id: 'conference', name: 'Conference Papers' },
  { id: 'research_report', name: 'Research Reports' },
  { id: 'policy_brief', name: 'Policy Briefs' }
]

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await fetch(`${apiUrl}/publications/org`)
        if (!response.ok) {
          throw new Error('Failed to fetch publications')
        }
        const data = await response.json()
        setPublications(data)
        setError(null)
      } catch (err) {
        setError('Failed to load publications. Please try again later.')
        console.error('Error fetching publications:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublications()
  }, [])

  const filteredPublications = publications.filter(pub => {
    const matchesType = selectedType === 'all' || pub.publication_type.toLowerCase() === selectedType
    const matchesSearch = searchQuery === '' ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-maurc-orange sm:text-5xl">
            Research Publications
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our collection of research publications, including journal articles,
            conference papers, and policy briefs focused on African urban development.
          </p>
        </div>

        <div className="mt-10 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-1">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="search"
                name="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-maurc-orange ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder="Search publications"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 flex space-x-4">
              {publicationTypes.map((type) => (
                <button
                  key={type.id}
                  className={`${selectedType === type.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-500 hover:text-gray-700'
                    } rounded-md px-3 py-1.5 text-sm font-medium`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading && <div className="mt-8 text-center text-gray-600">Loading publications...</div>}
        {error && <div className="mt-8 text-center text-red-600">{error}</div>}

        {!isLoading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPublications.map((publication) => (
              <div
                key={publication.id}
                className="rounded-lg bg-white shadow-lg overflow-hidden border border-gray-200"
              >
                {publication.poster && (
                  <img
                    src={publication.poster}
                    alt="/maurc-logo.png"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-maurc-orange">{publication.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{publication.authors}</p>
                  <p className="mt-4 text-sm text-gray-600">{publication.abstract}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-medium rounded-md">
                      {publication.publication_type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">{publication.year}</span>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    {publication.pdf_link && (
                      <a
                        href={publication.pdf_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        PDF
                      </a>
                    )}
                    {publication.doi && (
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-maurc-orange hover:underline"
                      >
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
