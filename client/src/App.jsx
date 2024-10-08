import { useState } from 'react'
import './App.css'
import JobPosting from './components/JobPosting/JobPosting'
import JobViewer from './components/JobViewer/JobViewer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div className="JobPosting">
      <h1>Job Posting Form</h1>
      <JobPosting />
    </div>


    <div>

    <h1>Explore Jobs</h1>
    <JobViewer />  {/* Display job postings one at a time */}
    </div>
    </>
  )
}

export default App
