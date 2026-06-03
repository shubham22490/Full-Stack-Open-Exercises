import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticLine = ({text, val, symbol = ''}) => (
  <tr>
    <td>{text}</td>
    <td>{val} {symbol}</td>
  </tr>
)
const Statistics = ({good, neutral, bad, total, avg, pos}) => {
  if (total === 0) {
    return(
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" val={good} />
          <StatisticLine text="neutral" val={neutral} />
          <StatisticLine text="bad" val={bad} />
          <StatisticLine text="all" val={total} />
          <StatisticLine text="average" val={avg} />
          <StatisticLine text="positive" val={pos} symbol="%" />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const avg = total === 0 ? 0 : (good - bad) / total
  const pos = total === 0 ? 0 : (good/total)*100

  const incrementVal = (setValue) => () => setValue((prev) => prev + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={incrementVal(setGood)} />
      <Button text="neutral" onClick={incrementVal(setNeutral)} />
      <Button text="bad" onClick={incrementVal(setBad)} />

      <Statistics good={good} bad={bad} neutral={neutral} total={total} avg={avg} pos={pos} />
    </div>
  )
}

export default App