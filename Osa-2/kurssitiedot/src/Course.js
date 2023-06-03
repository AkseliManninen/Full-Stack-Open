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

  export default Course