import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px;
  width: 300px;
`

const Signup = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    axios.post('/account/signup', { username, password }).then(() => {
      history.push('/')
    }).catch(err => {
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      Username:
      <input className="form-control" onChange={e => setUsername(e.target.value)} />
      Password:
      <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
      <button
        type="button"
        className="btn btn-info btn-block"
        style={{ margin: '15px 0' }}
        onClick={() => signup()}
      >
        Sign up
      </button>
      Already have an account?
      {' '}
      <Link to="/login">Log in here!</Link>
    </Wrapper>
  )
}

export default Signup
