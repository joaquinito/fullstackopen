import { useState } from 'react'

const Header = (props) => {
    return (
      <h1>{props.text}</h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handlerFunction}>{props.text}</button>
    )
}

const StatisticsLine = (props) => {
    // Positive percentage stat requires a '%' at the end
    if (props.text === "positive") {
        return (
            <tr><td>{props.text}</td><td>{props.value} %</td></tr>
        )
    }
    else {
        return (
            <tr><td>{props.text}</td><td>{props.value}</td></tr>
        )
    }
}

const Statistics = (props) => {
    // Only show statistics if there has been at least one feedback
    if(props.total === 0) {
        return "No feedback given"
    }
    else {
        return (
            <table>
                <StatisticsLine text="good" value={props.good}/>
                <StatisticsLine text="neutral" value={props.neutral}/>
                <StatisticsLine text="bad" value={props.bad}/>
                <StatisticsLine text="all" value={props.total}/>
                <StatisticsLine text="average" value={props.average}/>
                <StatisticsLine text="positive" value={props.positivePercentage}/>
            </table>
        )
    }
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
        <Button text="good" handlerFunction={handleGoodClick}/>
        <Button text="neutral" handlerFunction={handleNeutralClick}/>
        <Button text="bad" handlerFunction={handleBadClick}/>
        <Header text="statistics"/>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} 
                    average={average} positivePercentage={positivePercentage}/>
        </div>
    )
}

export default App