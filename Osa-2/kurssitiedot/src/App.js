// Muotoilee kurssin ja sen osat
const Course = (props) => {
  const parts = props.course.parts
  const total = props.course.parts.reduce((s, part) => s + part.exercises, 0)
  return(
  <div>
    <h1>{props.course.name}</h1>
    <p>
      {parts.map(part => <p>{part.name} {part.exercises}</p>)}
      <b>total of {total} excercises</b>
    </p>
  </div>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //const total = course.parts.reduce((s, part) => s + part.exercises, 0)

  return (
    <div>
      <p>
      {courses.map(course => <Course key = {course.id} course= {course} />)}
      </p>
    </div>
  )
}

export default App