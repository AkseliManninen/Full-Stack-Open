import { useState } from 'react'

// iso otsikko
const Header = (props) => (
  <div>
    <h1> {props.text} </h1>
  </div>
)

// nappi joka tekee jotain painettaessa
const Button = (props) => (
    <button onClick = {props.handleClick}> 
      {props.text} 
    </button>
)

// näyttää tulokset eri kategorioille
const Results = (props) => (
  <div>
    {props.text}
    {props.score}
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <Header text = "statistics"/>
      <Results text = "good " score = {good}/>
      <Results text = "neutral " score = {neutral}/>
      <Results text = "bad " score = {bad}/>
    </div>
  )
}

export default App