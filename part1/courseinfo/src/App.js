
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.part} {props.number_of_exercises}</p>
    )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.data[0]} number_of_exercises={props.data[1]}/>
      <Part part={props.data[2]} number_of_exercises={props.data[3]}/>
      <Part part={props.data[4]} number_of_exercises={props.data[5]}/>
    </div>
  )
}

const Total = (props) => {

  let sum = 0;
  for (let x of props.exercises_array){
    sum += x;
  }

  return (
    <p>Number of exercises {sum}</p>
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
      <Header course={course}/>
      <Content data = {[part1, exercises1, part2, exercises2, part3, exercises3]}/>
      <Total exercises_array={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App