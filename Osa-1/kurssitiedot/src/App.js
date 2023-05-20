const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

  const Header = (props) => (
    <div>
      <h1> {props.course} </h1>
    </div>
  )

  const Content = () => {
    return(
      <div>
        <Part part = {part1.name} exercises = {part1.exercises} />
        <Part part = {part2.name} exercises = {part2.exercises} />
        <Part part = {part3.name} exercises = {part3.exercises} />
      </div>
    )
  }

  const Total = (props) => (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
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
      <Content part1 = {part1.name} exercises1 = {part1.exercises} part2 = {part2.name} exercises2 = {part2.exercises} part3 = {part3.name} exercises3 = {part3.exercises} />
      <Total exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises}/>
    </div>
  )
}

export default App

