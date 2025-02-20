'use client'

import axios from "axios";
import { useState, useEffect } from "react";

const timeline = [
  {
    name: 'Establishment of MAURC',
    description:
      'Founded as a premier research institution dedicated to understanding and shaping the future of African cities.',
    date: 'Est. 2024',
    dateTime: '2024-01',
  },
  {
    name: 'Research Network Development',
    description:
      'Established partnerships with key research institutions and urban planning agencies across Africa.',
    date: 'Ongoing',
    dateTime: '2024-02',
  },
  {
    name: 'Launch of Urban Studies Program',
    description:
      'Initiated comprehensive research programs focusing on urban challenges, infrastructure, and social equity.',
    date: '2024',
    dateTime: '2024-03',
  },
  {
    name: 'Media Partnership Program',
    description:
      'Developed strategic partnerships with major African media outlets to enhance public engagement.',
    date: '2024',
    dateTime: '2024-04',
  },
];

const values = [
  {
    name: 'Research Excellence',
    description:
      'Through rigorous analysis and innovative research methodologies, we investigate critical urban challenges across Africa, integrating multiple disciplines for comprehensive insights.',
  },
  {
    name: 'Collaborative Approach',
    description:
      'We maintain extensive networks with research institutions, urban planning agencies, and civil society organizations across Africa, fostering meaningful partnerships for urban development.',
  },
  {
    name: 'Knowledge Translation',
    description:
      'We excel at translating complex urban research into accessible knowledge, ensuring our insights reach diverse audiences from policymakers to community organizations.',
  },
  {
    name: 'Implementation Focus',
    description:
      'We actively bridge the gap between research and practical implementation, working directly with city officials and urban planners to influence development decisions.',
  },
  {
    name: 'Media Engagement',
    description:
      'Our strong relationships with media partners enable effective communication of urban development issues, fostering informed public dialogue about African cities\' future.',
  },
  {
    name: 'Sustainable Impact',
    description:
      'We are committed to transforming how African cities are planned, built, and managed for the benefit of all urban residents through sustainable and equitable solutions.',
  },
];

export interface Profile {
  id: number;
  user_id: string;
  name: string;
  org_role: 'advisory' | 'team' | 'fellow';
  home_content?: string[];
  cv_link?: string;
  profile_image?: string;
  projects: {
    title: string;
    description: string;
    url: string;
  }[];
  teachings: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profiles = {
  getProfiles: async () => {
    const response = await api.get(`/profiles/`);
    return response.data;
  },
}

export default function About() {
  const [teamMembers, setTeamMembers] = useState<{
    advisory: Profile[];
    team: Profile[];
    fellow: Profile[];
  }>({
    advisory: [],
    team: [],
    fellow: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const allProfiles = await profiles.getProfiles();

        // Group profiles by role
        const grouped = allProfiles.reduce((acc: { [x: string]: any[]; }, profile: { org_role: string | number; }) => {
          if (!acc[profile.org_role]) {
            acc[profile.org_role] = [];
          }
          acc[profile.org_role].push(profile);
          return acc;
        }, {
          advisory: [],
          team: [],
          fellow: []
        });

        setTeamMembers(grouped);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="bg-white">
      <main className="isolate">
        <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-maurc-orange sm:text-7xl lg:col-span-2 xl:col-auto">
                A Premier Research Institution for African Urban Development
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Through rigorous analysis and innovative research methodologies, we investigate critical urban
                  challenges across the continent, integrating multiple disciplines to provide comprehensive insights
                  into Africa's urban landscape.
                </p>
              </div>
              <img
                alt=""
                src="/maurc-logo.png"
                className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
        </div>

        {/* Timeline section */}
        <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time dateTime={item.dateTime} className="flex items-center text-sm/6 font-semibold text-indigo-600">
                  <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                    <circle r={2} cx={2} cy={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    aria-hidden="true"
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg/8 font-semibold tracking-tight text-maurc-orange">{item.name}</p>
                <p className="mt-1 text-base/7 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange sm:text-5xl">
              What Sets Us Apart
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Our commitment to bridging the gap between research and practical implementation sets us apart.
              We actively engage with stakeholders at all levels to ensure our research directly influences
              urban development decisions.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-maurc-orange">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Content section */}
        <div className="mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-4xl font-semibold tracking-tight text-maurc-orange sm:text-5xl">Our People</h2>
                <p className="mt-6 text-xl/8 text-gray-600">
                  Our diverse team of researchers, academics, and practitioners brings together expertise from urban planning,
                  environmental science, social development, and policy analysis to address the complex challenges facing African cities.
                </p>
                <p className="mt-6 text-base/7 text-gray-600">
                  From early-career researchers to seasoned experts, our community is united by a shared commitment to sustainable
                  urban development in Africa. We believe in fostering collaboration across disciplines and borders, supporting the
                  next generation of urban scholars, and ensuring our research creates meaningful impact in communities.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    alt=""
                    src="/home-1.png"
                    className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      alt=""
                      src="/home-2.png"
                      className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="/home-3.png"
                      className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="/home-4.png"
                      className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange sm:text-5xl">
              Our Team
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our research and community engagement.
            </p>
          </div>

          {/* Advisory Board */}
          {teamMembers.advisory.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-semibold text-maurc-orange mb-12">Advisory Board</h3>
              <ul
                role="list"
                className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {teamMembers.advisory.map((person) => (
                  <li key={person.id}>
                    <img
                      src={person.profile_image || "/placeholder.svg?height=96&width=96"}
                      alt={person.name}
                      className="mx-auto size-24 rounded-full object-cover"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-maurc-orange">
                      {person.name}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Team */}
          {teamMembers.team.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-semibold text-maurc-orange mb-12">Core Team</h3>
              <ul
                role="list"
                className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {teamMembers.team.map((person) => (
                  <li key={person.id}>
                    <img
                      src={person.profile_image || "/placeholder.svg?height=96&width=96"}
                      alt={person.name}
                      className="mx-auto size-24 rounded-full object-cover"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-maurc-orange">
                      {person.name}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fellows */}
          {teamMembers.fellow.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-semibold text-maurc-orange mb-12">Research Fellows</h3>
              <ul
                role="list"
                className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {teamMembers.fellow.map((person) => (
                  <li key={person.id}>
                    <img
                      src={person.profile_image || "/placeholder.svg?height=96&width=96"}
                      alt={person.name}
                      className="mx-auto size-24 rounded-full object-cover"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-maurc-orange">
                      {person.name}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
