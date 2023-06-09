const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
  const Header = (props) => (
    <div>
      <h1> {props.course.name} </h1>
    </div>
  )

  const Content = () => {
    return(
      <div>
        <Part part = {course.parts[0].name} exercises = {course.parts[0].exercises} />
        <Part part = {course.parts[1].name} exercises = {course.parts[1].exercises} />
        <Part part = {course.parts[2].name} exercises = {course.parts[2].exercises} />
      </div>
    )
  }

  const Total = (props) => (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )

  const Part = (props) => (
    <div>
      <p>
      {props.part} {props.exercises}
      </p>
    </div>
  )

  return (
    <div>
      <Header course={course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App

