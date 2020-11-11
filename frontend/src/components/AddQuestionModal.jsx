import React, { useState } from 'react'
import axios from 'axios'

const AddQuestionModal = ({ questions, setQuestions }) => {
  const [questionText, setQuestionText] = useState('')

  const submitQuestion = () => {
    axios.post('/questions/add', { questionText }).then(res => {
      console.log(res)
      setQuestions([...questions, res.data])
    }).catch(err => {
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }

  return (
    <div
      className="modal fade"
      id="addQuestionModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addQuestionModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="modal-title" id="addQuestionModalTitle">Add Question:</h5>
            <textarea
              className="form-control"
              style={{ margin: '15px 0' }}
              onChange={e => {
                setQuestionText(e.target.value)
              }}
            />
            <button
              type="button"
              className="btn btn-info btn-block"
              data-dismiss="modal"
              onClick={e => {
                e.preventDefault()
                submitQuestion()
              }}
            >
              Submit Question
            </button>
            <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestionModal
