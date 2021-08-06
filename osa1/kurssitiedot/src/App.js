import React from 'react'

const Header = (props) => (
  <h1>{props.title}</h1>
)

const Content = (props) => (
  <>
    <Part {...props.parts[0]} />
    <Part {...props.parts[1]} />
    <Part {...props.parts[2]} />
  </>
)

const Total = (props) => {
  const count = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
    <p>
      Number of exercises {count}
    </p>
  )
}

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

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

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
