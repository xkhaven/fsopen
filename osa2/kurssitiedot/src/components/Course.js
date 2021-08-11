import React from "react"

const Course = ({course}) => {
  const Header = (props) => (
    <h1>{props.title}</h1>
  )

  const Part = (props) => (
    <p>{props.name} {props.exercises}</p>
  )

  const Content = (props) => (
    <>
      {props.parts.map((part) => {
        return (<Part key={part.id} {...part} />)
      })}
    </>
  )

  const Total = ({parts}) => {
    const count = parts.reduce((a, b) => {
      if (Number.isInteger(a)) {
        return a + b.exercises
      }
      else {
          return a.exercises + b.exercises
        }
      })

      return (
        <p>
          <strong>Number of exercises {count}</strong>
        </p>
      )
    }

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
