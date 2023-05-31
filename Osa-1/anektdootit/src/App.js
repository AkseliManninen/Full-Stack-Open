import { useState } from 'react'

// nappi joka tekee jotain painettaessa
const Button = (props) => (
  <button onClick = {props.handleClick}> 
    {props.text} 
  </button>
)

// nappi joka tekee jotain painettaessa
const Votes = (props) => (
  <div>
    has {props.votes} votes
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const nextAnecdoteOnClick = (props) => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const [votes, setVotes] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  })

  const voteOnClick = (props) => {
    const newVotes = { 
      ...votes, 
      [selected]:  votes[selected] + 1
    }
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <Votes votes = {votes[selected]}/>
      <div>
        <Button handleClick = {voteOnClick} text="vote" />
        <Button handleClick = {nextAnecdoteOnClick} text="next anecdote" />
      </div>
    </div>
  )
}

export default App