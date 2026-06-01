const Header = (prop) => {
  return (
    <>
      <h1>{prop.course}</h1>
    </>
  )
}

const Content = (prop) => {
  return (
    <>
      <Part part={prop.part[0]} exercises={prop.exercises[0]}/>
      <Part part={prop.part[1]} exercises={prop.exercises[1]}/>
      <Part part={prop.part[2]} exercises={prop.exercises[2]}/>
    </>
  )
}

const Part = (prop) => {
  return (
    <p>
      {prop.part} {prop.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App