const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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


  const Header = (props) => (
    <div>
      <h1> {props.course} </h1>
    </div>
  )

  const Content = () => {
    return(
      <div>
        <Part part = {parts[0].name} exercises = {parts[0].exercises} />
        <Part part = {parts[1].name} exercises = {parts[1].exercises} />
        <Part part = {parts[2].name} exercises = {parts[2].exercises} />
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
      <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} part2 = {parts[1].name} exercises2 = {parts[1].exercises} part3 = {parts[2].name} exercises3 = {parts[2].exercises} />
      <Total exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises}/>
    </div>
  )
}

export default App

