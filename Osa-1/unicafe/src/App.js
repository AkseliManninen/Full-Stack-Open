import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header1 = "give feedback"
  const header2 = "statistics"

  const Header = (props) => (
    <div>
      <h1> {props.text} </h1>
    </div>
  )

  return (
    <div>
      <Header text = {header1}/>
      <Header text = {header2}/>
    </div>
  )
}

export default App