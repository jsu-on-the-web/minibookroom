import { useState } from 'react'
import './App.css'
import './index.css'
import Card from './ui-elements/Card'

function App() {
  return (
    <>
      <h1>Hello world!</h1>
      <button className="mt-auto">Button</button>
      <Card title="The Great Gatsby" author="F. Scott Fitzgerald" onClick={() => {}} />
    </>
  )
}

export default App
