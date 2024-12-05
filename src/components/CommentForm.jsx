import { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CommentForm extends Component {
  render() {
    const commentsNumber = this.props.comments.length

    return (
      <div>
        {commentsNumber === 0 && (
          <div>
            <p>Nessun commento presente</p>
            <p>
              <b>Sii il primo a commentare!!! &#x1F44D;</b>
            </p>
          </div>
        )}
        <Button className='btn-warning my-5'>
          <FontAwesomeIcon
            className='me-2'
            icon='fa-regular fa-comment'
          ></FontAwesomeIcon>
          Commenta
        </Button>
      </div>
    )
  }
}
export default CommentForm
