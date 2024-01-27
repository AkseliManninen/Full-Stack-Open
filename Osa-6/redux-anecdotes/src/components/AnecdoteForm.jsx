import { useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(showNotification(`you created '${anecdote}'`))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
            </form>
        </div>
        )
}

export default AnecdoteForm