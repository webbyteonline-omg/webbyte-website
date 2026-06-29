import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, CheckCircle2, BookOpen, Award, Users, TrendingUp } from 'lucide-react'
import DemoBanner from '@/components/DemoBanner'

export const metadata: Metadata = {
  title: 'Coaching Institute Website Demo | WebByte',
  description: 'See how your coaching institute website will look — with courses, results showcase, and online admission.',
}

const courses = [
  { name: 'JEE / NEET Preparation', duration: '1 Year', fee: '₹45,000/yr', seats: '30 seats', tag: '🔥 Most Popular' },
  { name: 'Board Exam (10th & 12th)', duration: '1 Year', fee: '₹20,000/yr', seats: '40 seats', tag: null },
  { name: 'Foundation (8th & 9th)',   duration: '1 Year', fee: '₹15,000/yr', seats: '35 seats', tag: null },
  { name: 'Crash Course',             duration: '3 Months', fee: '₹8,000', seats: '20 seats', tag: '⚡ Limited' },
]

const results = [
  { name: 'Aryan Verma',  score: 'AIR 245', exam: 'JEE Advanced 2024' },
  { name: 'Priya Singh',  score: '98.6%',   exam: 'NEET 2024' },
  { name: 'Rohit Meena',  score: '99.2%',   exam: '12th Board CBSE' },
  { name: 'Nisha Patel',  score: 'AIR 780', exam: 'JEE Advanced 2024' },
]

export default function CoachingDemo() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner industry="Coaching Institute" price="₹9,999" />

      <nav className="sticky top-9 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg">📚</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base">Apex Coaching Institute</div>
              <div className="text-xs text-gray-400">JEE · NEET · Board Exams · Kota</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#courses" className="hover:text-purple-600">Courses</a>
            <a href="#results" className="hover:text-purple-600">Results</a>
            <a href="#faculty" className="hover:text-purple-600">Faculty</a>
          </div>
          <a href="#admission" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Apply Now</a>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              🏆 500+ Selections in Top Colleges — 2024
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">Where Toppers<br />Are Made</h1>
            <p className="text-purple-100 text-lg mb-8">15 years of producing JEE/NEET toppers. Small batches. Individual attention. Proven results.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#admission" className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors">Apply for Admission</a>
              <a href="#results" className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">See Our Results</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['500+','2024 Selections'], ['98%','Pass Rate'], ['15 yrs','Experience'], ['4.9★','Google Rating']].map(([v,l]) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20">
                <div className="text-3xl font-extrabold text-white">{v}</div>
                <div className="text-purple-200 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-16 bg-yellow-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Our 2024 Results</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Real students. Real achievements. Verified results.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-5 border border-yellow-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-extrabold text-purple-700">
                  {r.name.charAt(0)}
                </div>
                <div className="font-extrabold text-gray-900">{r.name}</div>
                <div className="text-2xl font-extrabold text-purple-700 my-1">{r.score}</div>
                <div className="text-xs text-gray-500">{r.exam}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Our Courses</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {courses.map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-purple-200 hover:shadow-md transition-all">
                {c.tag && <div className="inline-block bg-purple-700 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2">{c.tag}</div>}
                <h3 className="font-extrabold text-gray-900 mb-1">{c.name}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                  <span>⏱ {c.duration}</span><span>👥 {c.seats}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-purple-700">{c.fee}</div>
                  <a href="#admission" className="text-sm bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors">Enquire</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission form */}
      <section id="admission" className="py-16 bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Apply for Admission</h2>
          <p className="text-purple-100 mb-8">Fill the form. Get a call back within 24 hours. Limited seats available.</p>
          <div className="bg-white rounded-2xl p-6 text-gray-900 space-y-3 text-left">
            {["Student's Name", "Parent's Name", "Phone Number", "Course Interested In"].map(f => (
              <div key={f}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{f}</label>
                <div className="input-field bg-gray-50 text-gray-400 text-sm">{f}…</div>
              </div>
            ))}
            <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-purple-700 transition-colors">Submit Application</button>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Want This for Your Coaching?</h2>
        <p className="text-gray-500 mb-6 text-sm">Results showcase · Online admissions · Course catalogue · Faculty profiles</p>
        <Link href="/order" className="btn-primary">Get My Institute Website — ₹9,999 <ArrowRight className="w-4 h-4" /></Link>
      </section>
    </div>
  )
}
