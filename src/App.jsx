import { useState } from 'react'
import './App.css'
import ResumeBuilderReq from './components/ResumeBuilderReq '

function App() {
  const [count, setCount] = useState(0)

  return (  
    <div className="App">
      <ResumeBuilderReq/>
      </div>
  )
}

export default App
