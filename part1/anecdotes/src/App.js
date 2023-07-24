import { useState } from 'react'


const Button = (props) => {
   return (
      <button onClick={props.action}>{props.text}</button>
   )
}

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const nextAnecdote = () => {
    let newIndex = selected + 1
        if (newIndex === anecdotes.length){
          newIndex = 0
        }
        setSelected(newIndex)
        console.log("Selected anecdote: ", newIndex)
    }
    
    const voteForAnecdote = () => {
        // As explained in https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
        let newVotes = votes.map((value, index) => {
          if(index === selected){
            return value + 1
          }
          else{
            return value
          }
        })
        setVotes(newVotes)
        console.log(newVotes)
    }

    return (
        <div>
          {anecdotes[selected]}
          <br/>
          has {votes[selected]} votes
          <br/>
          <Button text="vote" action={voteForAnecdote}/>
          <Button text="next anecdote" action={nextAnecdote}/>
        </div>
    )
}

export default App