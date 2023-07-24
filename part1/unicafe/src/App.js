import { useState } from 'react'

const Header = (props) => {
    return (
      <h1>{props.text}</h1>
    )
}

const FeedbackStat = (props) => {
    if (props.name === "positive") {
        return (
            <div>{props.name} {props.stat} %</div>
        )
    }
    else {
        return (
            <div>{props.name} {props.stat}</div>
        )
    }
}

const Statistics = (props) => {
    return (
        <div>
        <FeedbackStat name="good" stat={props.good}></FeedbackStat>
        <FeedbackStat name="neutral" stat={props.neutral}></FeedbackStat>
        <FeedbackStat name="bad" stat={props.bad}></FeedbackStat>
        <FeedbackStat name="all" stat={props.total}></FeedbackStat>
        <FeedbackStat name="average" stat={props.average}></FeedbackStat>
        <FeedbackStat name="positive" stat={props.positivePercentage}></FeedbackStat>
        </div>
    )
}

const App = () => {
  
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)
    const [positivePercentage, setPositivePercentage] = useState(0)

    const updatePositivePercentage = (goodCount, totalCount) => {
        let newPositivePercentage = (goodCount / totalCount) * 100
        console.log("Current positive percentage: ", newPositivePercentage, " %")
        setPositivePercentage(newPositivePercentage)
    }

    const updateAverage = (goodCount, badCount, totalCount) => {
        let newAverage = (goodCount - badCount)/totalCount
        console.log("Current average: ", newAverage)
        setAverage(newAverage)
    }
  
    const incrementTotal = (goodCount, badCount) => {
        let newTotal = total + 1
        setTotal(newTotal)
        console.log("Total counter: ", newTotal)
        updateAverage(goodCount, badCount, newTotal)
        updatePositivePercentage(goodCount, newTotal)
    }

    const handleGoodClick = () => {
        console.log("User clicked 'good'")
        let newGoodValue = good +1
        setGood(newGoodValue)
        console.log("'good' counter: ", newGoodValue)
        incrementTotal(newGoodValue, bad)
    }

    const handleNeutralClick = () => {
        console.log("User clicked 'neutral'")
        let newNeutralValue = neutral +1
        setNeutral(newNeutralValue)
        console.log("'neutral' counter: ", newNeutralValue)
        incrementTotal(good, bad)
    }

    const handleBadClick = () => {
        console.log("User clicked 'bad'")
        let newBadValue = bad +1
        setBad(newBadValue)
        console.log("'bad' counter: ", newBadValue)
        incrementTotal(good, newBadValue)
    }

    return (
        <div>
        <Header text="give feedback"/>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <Header text="statistics"/>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} 
                    average={average} positivePercentage={positivePercentage}/>
        </div>
    )
}

export default App