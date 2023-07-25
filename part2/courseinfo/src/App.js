
const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = ({parts}) => {
  let sum = 0
  for (let x of parts){
    sum += x.exercises
  }
  return (
    <p><b>total of {sum} exercise{sum !== 1 && 's'}</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />
}

export default App