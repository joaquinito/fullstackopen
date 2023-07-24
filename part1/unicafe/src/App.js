import { useState } from 'react'

const Header = (props) => {
    return (
      <h1>{props.text}</h1>
    )
}

const FeedbackStat = (props) => {
    return (
        <div>{props.name} {props.count}</div>
    )
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("User clicked 'good'")
    let newGoodValue = good +1
    setGood(newGoodValue)
    console.log("'good' counter: ", newGoodValue)
  }

  const handleNeutralClick = () => {
    console.log("User clicked 'neutral'")
    let newNeutralValue = neutral +1
    setNeutral(newNeutralValue)
    console.log("'neutral' counter: ", newNeutralValue)
  }

  const handleBadClick = () => {
    console.log("User clicked 'bad'")
    let newBadValue = bad +1
    setBad(newBadValue)
    console.log("'bad' counter: ", newBadValue)
  }

  return (
    <div>
      <Header text="give feedback"/>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Header text="statistics"/>
      <FeedbackStat name="good" count={good}></FeedbackStat>
      <FeedbackStat name="neutral" count={neutral}></FeedbackStat>
      <FeedbackStat name="bad" count={bad}></FeedbackStat>
    </div>
  )
}

export default App