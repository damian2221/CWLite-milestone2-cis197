import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import QuestionsList from './QuestionsList'
import Question from './Question'

const ContentBox = styled.div`
  display: flex;
  background-color: #f2f2f2;
  width: 100%;
`

const LogOutButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const Home = () => {
  const [username, setUsername] = useState('')
  const [loginDataLoaded, setLoginDataLoaded] = useState(false)
  const [questions, setQuestions] = useState([])
  const [displayedQuestion, setDisplayedQuestion] = useState(null)

  const handleError = err => {
    if (err && err.response) {
      alert(err.response.data)
    }
  }

  useEffect(() => {
    let intervalID

    axios.get('/account/username').then(res => {
      setUsername(res.data.username)
      setLoginDataLoaded(true)

      const fetchQuestions = () => {
        axios.get('/questions').then(questionRes => {
          setQuestions(questionRes.data)
        }).catch(handleError)
      }
      intervalID = setInterval(fetchQuestions, 2000)
      fetchQuestions()
    }).catch(handleError)

    return () => {
      if (intervalID) {
        clearInterval(intervalID)
      }
    }
  }, [])

  useEffect(() => {
    if (displayedQuestion) {
      setDisplayedQuestion(questions.find(question => question._id === displayedQuestion._id))
    }
  }, [questions])

  if (!loginDataLoaded) {
    return (<></>)
  }

  const logOut = () => {
    axios.post('/account/logout').then(res => {
      setUsername('')
    }).catch(handleError)
  }

  return (
    <>
      <div style={{ padding: '15px' }}>
        <h2 style={{ display: 'inline-block' }}>Campuswire Lite</h2>
        { username ? (
          <span style={{ float: 'right', marginTop: '10px' }}>
            Hi
            {' '}
            { username }
            &nbsp;
            <LogOutButton onClick={() => logOut()}>Log out</LogOutButton>
          </span>
        ) : (<></>)}
      </div>
      <ContentBox>
        <QuestionsList
          isLoggedIn={!!username}
          questions={questions}
          setQuestions={setQuestions}
          setDisplayedQuestion={setDisplayedQuestion}
        />
        <Question
          isLoggedIn={!!username}
          questions={questions}
          setQuestions={setQuestions}
          question={displayedQuestion}
          setQuestion={setDisplayedQuestion}
        />
      </ContentBox>
    </>
  )
}

export default Home
