import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentRate from './CommentRate'

class CommentArea extends Component {
  render() {
    return (
      <div className='comment-area'>
        <h4>Commenti</h4>
        <ul>
          {this.props.comments.map((comment, index) => {
            return (
              <li key={index}>
                <p>
                  <span className='fw-bold'>Autore: </span>
                  {comment.author}
                </p>
                <p>
                  <span className='fw-bold'>Commento:</span>
                </p>
                <p className='bg-tertiary '>
                  <em>{comment.comment}</em>
                </p>
                <p>
                  <span className='fw-bold'>Rating:</span>
                  <CommentRate rating={comment.rate}></CommentRate>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default CommentArea
