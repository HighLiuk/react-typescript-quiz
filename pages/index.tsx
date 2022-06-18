import { Difficulty, getQuestions } from "@/utils/client"
import type { NextPage } from "next"
import { useState } from "react"
import { QuestionCard } from "../components"

const TOTAL_QUESTIONS: number = 10
const DIFFICULTY: Difficulty = Difficulty.EASY

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [gameOver, setGameOver] = useState(true)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

  async function startTrivia() {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await getQuestions(TOTAL_QUESTIONS, DIFFICULTY)
    setQuestions(newQuestions)

    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  function checkAnswer(answer: string) {
    if (gameOver) {
      return
    }

    const isCorrect = questions[number].correctAnswer === answer

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        isCorrect,
      },
    ])
  }

  function nextQuestion() {
    if (number + 1 === TOTAL_QUESTIONS) {
      return setGameOver(true)
    }

    setNumber(number + 1)
  }

  return (
    <>
      <h1 className="uppercase">React Quiz</h1>

      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button className="block" onClick={startTrivia}>
          Start
        </button>
      )}

      {gameOver || <p>Score: {score}</p>}

      {loading && <p>Loading Questions...</p>}

      {loading || gameOver || (
        <>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            checkAnswer={checkAnswer}
            userAnswer={userAnswers[number]?.answer}
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />

          {number + 1 === userAnswers.length &&
            number + 1 !== TOTAL_QUESTIONS && (
              <button onClick={nextQuestion}>Next Question</button>
            )}
        </>
      )}
    </>
  )
}

export default Home
