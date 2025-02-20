'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@headlessui/react';


export interface Publication {
    id: number;
    user_id: number;
    title: string;
    abstract: string;
    authors: string;
    publication_type: string;
    journal?: string;
    conference?: string;
    year: number;
    doi?: string;
    is_org: boolean;
    poster?: string;
    paper_summary?: string;
    url?: string;
    pdf_link?: string;
}

export function PublicationsPreview() {
    const [publications, setPublications] = useState<Publication[]>([])
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

                const policyBriefs = data
                    .filter((pub: { publication_type: string; }) => pub.publication_type === 'policy_brief')
                    .sort((a: { year: number; }, b: { year: number; }) => b.year - a.year)
                    .slice(0, 5)

                setPublications(policyBriefs)
                setError(null)
            } catch (err) {
                setError('Failed to load publications')
                console.error('Error fetching publications:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPublications()
    }, [])

    if (isLoading) {
        return (
            <div className="mt-16 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-maurc-orange" />
            </div>
        )
    }

    if (error) {
        <div className="mt-8 text-center text-red-600">{error}</div>
    }

    return (
        <div className="mt-16">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publications.map((publication) => (
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
                        {publication.paper_summary && (
                            <div className="border-t pt-4">
                                <div className="max-2xl">
                                    <center className="text-sm text-maurc-orange mb-2">Audio Summary</center>
                                    <iframe
                                        className='py-2 px-2'
                                        width="100%"
                                        height="166"
                                        scrolling="no"
                                        frameBorder="no"
                                        allow="autoplay"
                                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(publication.paper_summary)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Link href="/publications" passHref>
                    <Button className="text-maurc-orange py-4 px-5 rounded-lg outline">
                        View all publications
                    </Button>
                </Link>
            </div>
        </div>
    )
}