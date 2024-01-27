import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        console.log('vote', id)
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAnecdote({ id: id }))
        dispatch(showNotification(`you voted '${votedAnecdote.content}'`))
      }

    const filteredAnecdotes = anecdotes.filter(anecdote => {
        console.log(anecdote)
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
    
    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
      )}
        </div>
        )
}

export default AnecdoteList