import { Component, useState, setState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentRate from './CommentRate'

const MyComments = (props) => {
  //console.log('MyComments props:', props)

  const [newComment, setNewComments] = useState({
    comment: '',
    rate: '1',
    elementId: props.modalContent.asin,
  })

  const deleteComment = (id) => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDYyMDhhZDEyOTAwMTU4NzZiYzEiLCJpYXQiOjE3MzMxNDUxNDMsImV4cCI6MTczNDM1NDc0M30.b9vuC2wosIXVBrGf0AQwNBGmQXwsfYjq4W2ppICdxQA',
      },
    })
      .then((response) => {
        if (response.ok) {
          //alert('Commento aggiunto con successo!')
          setNewComments({
            comment: '',
            rate: '1',
            elementId: props.modalContent.asin,
          })
          props.setAppState('update', true)
        } else {
          throw new Error('Errore nella cancellazione del commento')
        }
      })
      .catch((err) => {
        console.error(err)
        alert('Errore nella cancellazione del commento')
      })
  }

  // Funzione per inviare il commento
  const postComment = () => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDYyMDhhZDEyOTAwMTU4NzZiYzEiLCJpYXQiOjE3MzMxNDUxNDMsImV4cCI6MTczNDM1NDc0M30.b9vuC2wosIXVBrGf0AQwNBGmQXwsfYjq4W2ppICdxQA',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (response.ok) {
          //alert('Commento aggiunto con successo!')
          setNewComments({
            comment: '',
            rate: '1',
            elementId: props.modalContent.asin,
          })
          props.setAppState('update', true)
        } else {
          throw new Error('Errore nel salvataggio del commento')
        }
      })
      .catch((err) => {
        console.error(err)
        alert("Errore durante l'invio del commento")
      })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewComments({
      ...newComment,
      [name]: value,
    })
  }

  const { title, img, category } = props.modalContent
  return (
    <div
      id='commentArea'
      className='sticky-top overflow-y-scroll border border-1 rounded rounded-1 shadow p-3'
      style={{ height: '98vh' }}
    >
      <div className='position-relative'>
        <img src={img} className='img-fluid opacity-50 ' alt={title} />
        <h5
          id='commentsBookTitle'
          className='text-white text-center m-3 p-2 position-absolute bottom-0'
        >
          {title}
          <br />
          <span className='text-warning fs-6 fw-bold text-capitalize'>
            Categoria: {category}
          </span>
        </h5>
      </div>
      <hr />

      {props.comments.length === 0 && (
        <>
          <p>Non ci sono commenti per questo libro.</p>
          <p className='fw-bold'>Commentalo tu per primo!</p>
        </>
      )}

      {/* Form per aggiungere commenti */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          postComment()
        }}
      >
        <div className='mb-3'>
          <label htmlFor='comment' className='form-label'>
            Commento
          </label>
          <textarea
            placeholder='Inserisci il tuo commento...'
            id='comment'
            name='comment'
            value={newComment.comment}
            onChange={handleInputChange}
            className='form-control'
            rows='3'
            required
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='rate' className='form-label d-inline-block me-1'>
            Voto:
          </label>
          <div id='rate' className='d-inline-block'>
            {[1, 2, 3, 4, 5].map((rate) => (
              <FontAwesomeIcon
                key={rate}
                icon={['fas', 'star']}
                className={`star ${
                  rate <= newComment.rate ? 'text-warning' : 'text-secondary'
                }`}
                onClick={() =>
                  setNewComments({ ...newComment, rate: rate.toString() })
                }
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div className='text-center my-4'>
          <button type='submit' className='btn btn-success '>
            Invia commento
          </button>
        </div>
      </form>

      <hr />

      {props.comments.length > 0 && (
        <>
          <h5>Commenti</h5>
          <ul>
            {props.comments.map((comment, index) => (
              <li key={index}>
                <p>
                  <span className='fw-bold'>Autore: </span>
                  {comment.author}
                </p>
                <p>
                  <span className='fw-bold'>Commento:</span>
                </p>
                <p className='bg-tertiary'>
                  <em>{comment.comment}</em>
                </p>
                <p>
                  <span className='fw-bold'>Rating:</span>
                  <CommentRate rating={comment.rate}></CommentRate>
                </p>
                {comment.author === props.commentAppUser && (
                  <Button
                    variant='danger'
                    onClick={() => {
                      deleteComment(comment._id)
                    }}
                  >
                    <FontAwesomeIcon
                      icon='fa-solid fa-trash'
                      className='fs-8'
                    />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MyComments
