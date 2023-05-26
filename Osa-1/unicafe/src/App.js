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
const Statistics = (props) => (
  <div>
    {props.text} {props.score} {props.character}
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1 
    setGood(updatedGood)
    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)
    setAverage((updatedGood - bad) / updatedAll)
    setPositive((updatedGood / updatedAll) * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = good + updatedNeutral + bad
    setAll(updatedAll)
    setAverage((good - bad) / updatedAll)
    setPositive((good / updatedAll) * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = good + neutral + updatedBad
    setAll(updatedAll)
    setAverage((good - updatedBad) / (updatedAll))
    setPositive((good / updatedAll) * 100)
  }

  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <Header text = "statistics"/>
      <Statistics text = "good" score = {good}/>
      <Statistics text = "neutral" score = {neutral}/>
      <Statistics text = "bad" score = {bad}/>
      <Statistics text = "all" score = {all}/>
      <Statistics text = "average" score = {average}/>
      <Statistics text = "positive" score = {positive} character = "%"/>
    </div>
  )
}

export default App