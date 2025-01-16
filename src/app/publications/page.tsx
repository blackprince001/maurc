'use client'

import { useState } from 'react'

// Example data type based on the schema
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
  user_id: number
}

// Example publications array (this would come from your API)
const examplePublications: Publication[] = [
  {
    title: "Urban Climate Resilience in African Coastal Cities",
    abstract: "This study examines the challenges and opportunities in building climate resilience in rapidly growing African coastal urban areas, with a focus on adaptive infrastructure and community engagement.",
    authors: "John Doe, Jane Smith, Robert Johnson",
    publication_type: "Journal Article",
    journal: "African Urban Studies Review",
    conference: "",
    year: 2024,
    doi: "10.1234/aus.2024.001",
    url: "https://example.com/publication1",
    pdf_link: "#",
    id: 1,
    user_id: 1
  },
  // Add more example publications as needed
]

// Filter options for publication types
const publicationTypes = [
  { id: 'all', name: 'All Publications' },
  { id: 'journal', name: 'Journal Articles' },
  { id: 'conference', name: 'Conference Papers' },
  { id: 'report', name: 'Research Reports' },
  { id: 'policy', name: 'Policy Briefs' }
]

export default function Publications() {
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-maurc-orange sm:text-5xl">
            Research Publications
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our collection of research publications, including journal articles, 
            conference papers, and policy briefs focused on African urban development.
          </p>
        </div>

        {/* Filters and Search Section */}
        <div className="mt-10 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-1">
            <div className="mt-4 sm:mt-0">
              <div className="sm:flex sm:items-center">
                {/* Search Input */}
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search publications
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-maurc-orange ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search publications"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="mt-4 sm:ml-4 sm:mt-0">
                  <div className="flex space-x-4">
                    {publicationTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`${
                          selectedType === type.id
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
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className="mt-8 space-y-8">
          {examplePublications.map((publication) => (
            <div
              key={publication.id}
              className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-7 text-maurc-orange">
                    {publication.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {publication.authors}
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    {publication.abstract}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                      {publication.publication_type}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-500">
                      {publication.journal || publication.conference}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-500">
                      {publication.year}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex shrink-0 space-x-4">
                  {publication.pdf_link && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                      </svg>
                      PDF
                    </button>
                  )}
                  {publication.doi && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-maurc-orange shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      DOI
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (can be implemented based on your needs) */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            {/* Pagination controls can be added here */}
          </nav>
        </div>
      </div>
    </div>
  )
}