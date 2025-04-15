import { useState } from 'react'
import './App.css'
import { CardText } from './components/CardText'
import { CardUpload } from './components/CardUpload'
import { Logo } from './components/Logo'

function App() {
  return(
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <header className="flex items-center justify-center py-6">
        <Logo size="large" />
      </header>
      
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto w-full">
        <div className="w-full md:w-1/2">
          <CardUpload />
        </div>
        <div className="w-full md:w-1/2">
          <CardText />
        </div>
      </div>
      
      <footer className="mt-auto py-4 text-center text-gray-400 text-sm">
        © 2025 mmail. All rights reserved.
      </footer>
    </div>
  )
}

export default App