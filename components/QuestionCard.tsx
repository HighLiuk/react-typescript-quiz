import { FC } from "react"

type Props = {
  question: string
  answers: string[]
  checkAnswer: (answer: string) => void
  userAnswer?: string
  questionNumber: number
  totalQuestions: number
}

const QuestionCard: FC<Props> = ({
  question,
  answers,
  checkAnswer,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <>
      <p>
        Question: {questionNumber} / {totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }} />

      {answers.map((answer, i) => (
        <div key={i}>
          <button disabled={!!userAnswer} onClick={() => checkAnswer(answer)}>
            <span>{answer}</span>
          </button>
        </div>
      ))}
    </>
  )
}

export default QuestionCard
