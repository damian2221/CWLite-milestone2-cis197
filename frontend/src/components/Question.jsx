import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px;
  border: 1px solid #bbbbbb;
  flex: 1;
`

const QuestionBox = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`

const DetailBox = styled.div`
  padding-bottom: 15px;
`

const Question = ({
  isLoggedIn, question, setQuestion, questions, setQuestions,
}) => {
  const [answer, setAnswer] = useState('')
  const [questionId, setQuestionId] = useState('')

  useEffect(() => {
    if (question && questionId !== question._id) {
      setAnswer('')
      setQuestionId(question._id)
    }
  }, [question])

  const submitAnswer = () => {
    axios.post('/questions/answer', { _id: question._id, answer }).then(() => {
      const updatedQuestion = { ...question }
      updatedQuestion.answer = answer
      setQuestion(updatedQuestion)
      setQuestions(questions.map(
        questionInList => (questionInList._id === updatedQuestion._id ? updatedQuestion
          : questionInList),
      ))
    }).catch(err => {
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }

  if (!question) {
    return (<></>)
  }

  return (
    <Wrapper>
      <QuestionBox>
        <h3>{ question.questionText }</h3>
        <DetailBox>
          <b>Author:</b>
          <br />
          { question.author }
        </DetailBox>
        <DetailBox>
          <b>Answer:</b>
          <br />
          { question.answer }
        </DetailBox>
      </QuestionBox>
      { isLoggedIn
        ? (
          <div style={{ marginTop: '35px' }}>
            Answer this question:
            <textarea
              className="form-control"
              value={answer}
              style={{ marginBottom: '15px' }}
              onChange={e => {
                setAnswer(e.target.value)
              }}
            />
            <button
              type="button"
              lassName="btn btn-info btn-block"
              onClick={() => submitAnswer()}
            >
              Submit Answer
            </button>
          </div>
        ) : <></>}
    </Wrapper>
  )
}

export default Question
