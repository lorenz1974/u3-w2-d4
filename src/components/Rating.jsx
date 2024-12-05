import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const defaultProps = {
  max: 5, // Valore massimo della scala
  color: 'text-warning', // Colore delle stelle
}

const Rating = (props) => {
  const generateStars = (fullStars, hasHalfStar, emptyStars, color) => {
    const stars = []

    // Stelle piene
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          className={`p-0 m-0 fs-6 ${color}`}
          key={`full-${i}`}
          icon='fas fa-star'
        />
      )
    }

    // Mezza stella
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          className={`p-0 m-0 fs-6 ${color}`}
          key='half'
          icon='fas fa-star-half-alt'
        />
      )
    }

    // Stelle vuote
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          className={`p-0 m-0 fs-6 ${color}`}
          key={`empty-${i}`}
          icon='far fa-star'
        />
      )
    }

    return stars
  }

  const { rate, max, color } = { ...defaultProps, ...props }

  const fullStars = Math.floor(rate) // Numero di stelle piene
  const hasHalfStar = rate % 1 !== 0 // Mezza stella presente?
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0) // Numero di stelle vuote

  return (
    <>
      {/* Valore attuale */}
      <span className={`px-1 ${color}`}>{rate.toFixed(1)}</span>

      {/* Genera stelle */}
      {generateStars(fullStars, hasHalfStar, emptyStars, color)}

      {/* Valore massimo */}
      <span className={`px-1 ${color}`}>{max}</span>
    </>
  )
}

export default Rating
