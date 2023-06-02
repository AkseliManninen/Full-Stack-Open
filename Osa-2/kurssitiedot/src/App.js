// Muotoilee kurssin ja sen osat
const Course = (props) => {
  const parts = props.course.parts
  return(
  <div>
    <h1>{props.course.name}</h1>
    <p>
      {parts.map(part => <p>{part.name} {part.exercises}</p>)}
    </p>
  </div>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  const total = course.parts.reduce((s, part) => s + part.exercises, 0)

  return (
    <div>
      <Course course={course} />
      <p>total of {total} excercises</p>
    </div>
  )
}

export default App