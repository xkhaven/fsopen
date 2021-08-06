import React, { useState } from 'react'

const Header = ({title}) => (
  <h1>{title}</h1>
)

const Button = ({handleClick, value}) => (
  <button onClick={handleClick}>{value}</button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <th align="left">{text}</th><td> {value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {

  if (!good && !neutral && !bad) {
    return (<p>No feedback given</p>)
  }

  const totalCount = good + neutral + bad
  const averageCount = (good - bad) / totalCount
  const positiveCount = good / (totalCount / 100) + " %"

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={totalCount}/>
        <StatisticLine text="Average" value={averageCount}/>
        <StatisticLine text="Positive" value={positiveCount}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="Give feedback" />
      <Button handleClick={() => setGood(good + 1)} value="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} value="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} value="Bad" />

      <div>
        <Header title="Statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
