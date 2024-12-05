import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CommentRate extends Component {
  render() {
    const fullStars = Math.floor(this.props.rating)
    const hasHalfStar = this.props.rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    const fullStarsElements = Array.from({ length: fullStars }).map((_, i) => (
      <FontAwesomeIcon
        className='ms-1 text-warning fs-6'
        key={`full-${i}`}
        icon='fas fa-star'
      ></FontAwesomeIcon>
    ))

    const halfStarElement = hasHalfStar ? (
      <FontAwesomeIcon
        className='ms-1 text-warning fs-6'
        key='half'
        icon='fas fa-star-half-alt'
      ></FontAwesomeIcon>
    ) : null

    const emptyStarsElements = Array.from({ length: emptyStars }).map(
      (_, i) => (
        <FontAwesomeIcon
          className='ms-1 text-warning fs-6'
          key={`empty-${i}`}
          icon='far fa-star'
        ></FontAwesomeIcon>
      )
    )

    return [...fullStarsElements, halfStarElement, ...emptyStarsElements]
  }
}

export default CommentRate
