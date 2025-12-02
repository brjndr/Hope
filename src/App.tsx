import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <h3>Welcome to Jio-Hope</h3>
        <p>This is a starter template for your Jio-Hope project.</p>
        <p>Get started by editing <code>src/App.tsx</code></p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
