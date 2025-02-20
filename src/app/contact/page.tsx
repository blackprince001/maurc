"use client"


import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from 'lucide-react';


export interface OrganizationCenter {
  id: number;
  center_name: string;
  location: string;
}

export interface OrganizationPartner {
  id: number;
  name: string;
  socials: string[];
  logo_url: string;
}

export interface OrganizationCareer {
  id: number;
  title: string;
  description: string;
  type: string;
  is_closed: boolean;
}

export interface OrganizationContact {
  id: number;
  title: string;
  description: string;
  type: string;
  is_closed: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const organization = {
  // Centers
  getCenters: async () => {
    const response = await api.get('/organization/centers/');
    return response.data;
  },

  // Partners
  getPartners: async () => {
    const response = await api.get('/organization/partners/');
    return response.data;
  },

  // Careers
  getCareers: async () => {
    const response = await api.get('/organization/careers/');
    return response.data;
  },

};


export default function Contact() {
  const [data, setData] = useState<{
    centers: OrganizationCenter[];
    partners: OrganizationPartner[];

    careers: OrganizationCareer[];
  }>({
    centers: [],
    partners: [],
    careers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [centers, partners, careers] = await Promise.all([
          organization.getCenters(),
          organization.getPartners(),
          organization.getCareers(),
        ]);

        setData({
          centers,
          partners,
          careers: careers.filter((career: { is_closed: any; }) => !career.is_closed),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load some data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          {/* Contact Section */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange">Get in touch</h2>
              <p className="mt-4 text-base/7 text-gray-600">
                Connect with MAFLO African Urban Research Center (MAURC) for research collaborations, media inquiries, or general information.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-maurc-orange">Research Collaboration</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:research@maurc.org" className="font-semibold text-indigo-600">
                        research@maurc.org
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Department</dt>
                    <dd>Research and Collaborations Department</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-maurc-orange">Media & Press</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:media@maurc.org" className="font-semibold text-indigo-600">
                        media@maurc.org
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Department</dt>
                    <dd>Communications & Media Relations</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-maurc-orange">Partnership Inquiries</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:partnerships@maurc.org" className="font-semibold text-indigo-600">
                        partnerships@maurc.org
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Department</dt>
                    <dd>Strategic Partnerships Office</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-maurc-orange">General Inquiries</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href="mailto:info@maurc.org" className="font-semibold text-indigo-600">
                        info@maurc.org
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Department</dt>
                    <dd>General Administration</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          {(
            <div className="pt-16">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange">
                  Our Partners
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600">
                  We collaborate with leading institutions and organizations across Africa to advance urban research and development.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {data.partners.length > 0 && data.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex flex-col items-center justify-between rounded-2xl bg-gray-50 p-8 h-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      {partner.logo_url && (
                        <img
                          src={partner.logo_url || "/placeholder.svg"}
                          alt={partner.name}
                          className="h-16 w-auto object-contain mb-6"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-maurc-orange">{partner.name}</h3>
                      <div className="mt-4 flex gap-3">
                        {partner.socials.map((social, index) => (
                          <a
                            key={index}
                            href={social}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-maurc-orange"
                          >
                            <span className="sr-only">Social link {index + 1}</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locations Section */}
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange">Our Locations</h2>
              <p className="mt-4 text-base/7 text-gray-600">
                Visit our research centers and offices across Africa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              {data.centers.map((center) => (
                <div key={center.id} className="rounded-2xl bg-gray-50 p-10">
                  <h3 className="text-base/7 font-semibold text-maurc-orange">{center.center_name}</h3>
                  <address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
                    <p>{center.location}</p>
                  </address>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions Section */}
          {(
            <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-3">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange">Open Positions</h2>
                <p className="mt-4 text-base/7 text-gray-600">
                  Join our team and contribute to urban research and development in Africa.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:col-span-2">
                {data.careers.length > 0 && data.careers.map((career) => (
                  <div key={career.id} className="rounded-2xl bg-gray-50 p-10">
                    <h3 className="text-base/7 font-semibold text-maurc-orange">{career.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{career.description}</p>
                    <p className="mt-2 text-sm font-medium text-maurc-orange">{career.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}