import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import AddQuestionModal from './AddQuestionModal'

const Wrapper = styled.div`
  padding: 15px;
  border: 1px solid #bbbbbb;
  width: 35%;
`

const Item = styled.div`
  background-color: white;    
  margin: 10px 0;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #bbbbbb;
`

const QuestionsList = ({
  isLoggedIn, questions, setQuestions, setDisplayedQuestion,
}) => {
  const history = useHistory()

  const login = () => {
    history.push('/login')
  }

  return (
    <Wrapper>
      { !isLoggedIn
        ? (
          <button
            type="button"
            className="btn btn-info btn-block"
            onClick={() => login()}
          >
            Log in to submit your question
          </button>
        )
        : (
          <button
            type="button"
            className="btn btn-info btn-block"
            data-toggle="modal"
            data-target="#addQuestionModal"
          >
            Add new Question +
          </button>
        )}
      { questions.map(question => (
        <Item onClick={() => setDisplayedQuestion(question)} key={question._id}>
          { question.questionText }
          {' '}
        </Item>
      )) }
      <AddQuestionModal questions={questions} setQuestions={setQuestions} />
    </Wrapper>
  )
}

export default QuestionsList
