import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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

  // 
  const Results = (props) => (
    <div>
      {props.text}
      {props.score}
    </div>
  )

  return (
    <div>
      <Header text = "give feedback"/>
      <Button text = "good" />
      <Button text = "neutral" />
      <Button text = "bad" />
      <Header text = "statistics"/>

      <Results text = "good " score = {good}/>
      <Results text = "neutral " score = {neutral}/>
      <Results text = "bad " score = {bad}/>
    </div>
  )
}

export default App