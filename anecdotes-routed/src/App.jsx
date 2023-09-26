import { useState } from "react"
import { Routes, Route, useMatch } from "react-router-dom"
import About from "./components/About"
import Anecdote from "./components/Anecdote"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/CreateNew"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Notification from "./components/Notification"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New anecdote created: ${anecdote.content}`)
    setTimeout(() => setNotification(""), 5000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  /* Every time the component is rendered, so practically every time the browser's URL changes,
   the following command is executed. If the URL matches /notes/:id, the match variable will 
   contain an object from which we can access the parameterized part of the path, the id of 
   the note to be displayed, and we can then fetch the correct note to display.
   */
  const match = useMatch("/anecdotes/:id")
  const anecdote = match ? anecdotes.find((a) => a.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
