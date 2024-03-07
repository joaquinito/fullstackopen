
const CourseHeader = ({text}) => <h2>{text}</h2>
 
const Part = ({name, exercises}) => <p>{name} {exercises}</p>

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
    let sum = parts.reduce((s, p) =>  s + p.exercises, 0)
    return (
        <p><b>total of {sum} exercise{sum !== 1 && 's'}</b></p>
    )
}

const Course = ({course}) => {
    return (
        <div>
        <CourseHeader text={course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
        </div>
    )
}

export default Course