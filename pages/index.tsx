import type { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
  const [score, setScore] = useState(0)

  async function startTrivia() {}

  function nextQuestion() {}

  return (
    <>
      <h1 className="uppercase">React Quiz</h1>

      <button className="block" onClick={startTrivia}>
        Start
      </button>

      <p>Score: {score}</p>

      <p>Loading Questions...</p>

      {/* Question Card */}

      <button onClick={nextQuestion}>Next Question</button>
    </>
  )
}

export default Home
