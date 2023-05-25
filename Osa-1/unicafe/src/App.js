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
    {props.text} {props.score}
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1 
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    setAverage((updatedGood - bad) / updatedTotal)
    setPositive((updatedGood / updatedTotal) * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = good + updatedNeutral + bad
    setTotal(updatedTotal)
    setAverage((good - bad) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal)
    setAverage((good - updatedBad) / (updatedTotal))
    setPositive((good / updatedTotal) * 100)
  }

  const All = () => {
    return(     
    <div>
      all {total}
   </div>)
  }

  const Average = () => {
    return(     
    <div>
      average {average}
   </div>)
  }

  const Positive = () => {
    return(     
    <div>
      positive {positive}
   </div>)
  }

  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <Header text = "statistics"/>
      <Results text = "good" score = {good}/>
      <Results text = "neutral" score = {neutral}/>
      <Results text = "bad" score = {bad}/>
      <All/>
      <Average/>
      <Positive/>
    </div>
  )
}

export default App