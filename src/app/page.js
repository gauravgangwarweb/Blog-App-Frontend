"use client"

import Navbar from './components/navbar'
import Hero1 from './home/hero1'
import Hero2 from './home/hero2'

export default function Home() {
  
  return (
    <div className="px-2">
      <Navbar />
      <Hero1 />
      <Hero2 />
    </div>
  )
}
