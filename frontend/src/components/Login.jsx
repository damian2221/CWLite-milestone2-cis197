import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px;
  width: 300px;
`

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    axios.post('/account/login', { username, password }).then(() => {
      history.push('/')
    }).catch(err => {
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }

  return (
    <Wrapper>
      <h2>Log In</h2>
      Username:
      <input className="form-control" onChange={e => setUsername(e.target.value)} />
      Password:
      <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
      <button
        type="button"
        className="btn btn-info btn-block"
        style={{ margin: '15px 0' }}
        onClick={() => login()}
      >
        Log In
      </button>
      Don&apos;t have an account?
      {' '}
      <Link to="/signup">Sign up!</Link>
    </Wrapper>
  )
}

export default Login
