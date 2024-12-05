import { Component } from 'react'
import { Row } from 'react-bootstrap'
import SingleBook from './SingleBook'

const BookList = (props) => {
  //console.log('BookList props:', props)
  return (
    <>
      <Row className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 mt-1'>
        {props.booksArray
          .filter((book) => {
            if (props.searchTerms && props.search) {
              return (
                book.title
                  .toLowerCase()
                  .includes(props.searchTerms.toLowerCase()) ||
                book.asin
                  .toLowerCase()
                  .includes(props.searchTerms.toLowerCase())
              )
            }
            return book.category === props.category
          })
          .map((book) => (
            <SingleBook
              key={book.asin}
              book={book}
              selectedBooks={props.selectedBooks}
              setSelectedBooks={props.setSelectedBooks}
              setAppState={props.setAppState}
              comments={props.comments.filter(
                (bookComments) =>
                  String(book.asin) === String(bookComments.elementId)
              )}
            />
          ))}
      </Row>
    </>
  )
}

export default BookList
