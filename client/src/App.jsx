import { useState } from 'react'
import './App.css'
import JobPosting from './components/JobPosting/JobPosting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="JobPosting">
      <h1>Job Posting Form</h1>
      <JobPosting />
    </div>
    </>
  )
}

export default App
