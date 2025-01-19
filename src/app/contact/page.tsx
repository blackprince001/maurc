export default function Contact() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
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
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-maurc-orange">Our Locations</h2>
              <p className="mt-4 text-base/7 text-gray-600">
                Visit our research centers and offices across Africa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-maurc-orange">Main Research Center</h3>
                <address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
                  <p>MAURC Headquarters</p>
                  <p>Urban Research Complex</p>
                  <p>Accra, Ghana</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}