import React from 'react'

function About() {
    return (
        <section className="bg-[rgb(24,32,36)] py-24 text-slate-200">
  <div className="max-w-6xl mx-auto px-6 space-y-24">

    {/* ===== Header ===== */}
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
        About Our Bookstore
      </h1>

      <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
        We believe that books are more than just pages bound together. They are sources of knowledge, inspiration, and personal growth. Our bookstore is built for readers who seek quality content, meaningful ideas, and reliable access to books that truly matter.
      </p>
    </div>

    {/* ===== Mission & Vision ===== */}
    <div className="grid md:grid-cols-2 gap-16">

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Our Mission
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Our mission is to make valuable books easily accessible to everyone. We aim to curate books that educate, inspire, and empower readers across different fields including technology, history, psychology, and self-development.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Our Vision
        </h2>
        <p className="text-slate-400 leading-relaxed">
          We envision a future where knowledge is not limited by accessibility or cost. Our goal is to become a trusted platform where readers can explore books that shape understanding, critical thinking, and lifelong learning.
        </p>
      </div>

    </div>

    {/* ===== Why Choose Us & Values ===== */}
    <div className="grid md:grid-cols-2 gap-16">

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Why Choose Us
        </h2>

        <ul className="space-y-3 text-slate-400">
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Carefully curated book collections
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Focus on quality and authenticity
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Reader-centered experience
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Continuous improvement and learning
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Our Values
        </h2>

        <ul className="space-y-3 text-slate-400">
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Knowledge over noise
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Integrity in content selection
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Accessibility for learners
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400">•</span>
            Growth through reading
          </li>
        </ul>
      </div>

    </div>

  </div>
</section>

    )
}

export default About
