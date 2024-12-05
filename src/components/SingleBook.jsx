import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import Rating from './Rating'

const SingleBook = (props) => {
  const { book, selectedBooks, setSelectedBooks, setAppState, comments } = props

  const isSelected = selectedBooks.includes(book.asin)

  const bookRating =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + parseInt(comment.rate), 0) /
        comments.length
      : 0

  //console.log('SingleBook - comments', comments)

  // ritorna la scheda libro
  return (
    <Col key={book.asin} className='mt-5'>
      <Card className='shadow h-100' style={{ opacity: isSelected ? 0.5 : 1 }}>
        <div
          style={{ height: '200px' }}
          className='d-flex justify-content-center'
        >
          <Card.Img
            className='mx-auto mt-3 p-0 rounded shadow w-50'
            variant='top'
            src={book.img}
            alt={`Copertina di ${book.title}`}
            onClick={() => setSelectedBooks(book.asin)}
          />
        </div>
        <Card.Body className='d-flex flex-column justify-content-between'>
          <Card.Title className='d-flex align-items-start py-0 m-0 mt-2 flex-grow-1'>
            {book.title}
          </Card.Title>
          <Card.Text className='d-flex py-0 m-0 mt-2 '>
            ASIN: {book.asin}
          </Card.Text>
          {bookRating > 0 && (
            <Card.Text className='py-0 m-0 mt-2 '>
              Rating: {<Rating rate={bookRating} max={5} />}
            </Card.Text>
          )}

          <Card.Text className='d-flex py-0 m-0 mt-2 justify-content-end fs-4 '>
            <span className='fw-bold'>€ {book.price.toFixed(2)}</span>
          </Card.Text>
          <Card.Footer className='d-flex py-0 justify-content-center'>
            <Button
              variant={'warning'}
              className='m-2 shadow'
              onClick={() => {
                setAppState('modalContent', {
                  asin: book.asin,
                  title: book.title,
                  img: book.img,
                  price: book.price,
                  category: book.category,
                })
              }}
            >
              Commenti
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SingleBook
