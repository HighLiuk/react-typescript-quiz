type ApiResponse = {
  results: {
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }[]
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const getQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<Question[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`

  const res = await fetch(endpoint)
  const data: ApiResponse = await res.json()

  return data.results.map((question) => {
    const answers = [...question.incorrect_answers, question.correct_answer]

    return {
      question: question.question,
      answers,
      correctAnswer: question.correct_answer,
    }
  })
}
