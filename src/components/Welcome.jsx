import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function Welcome() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Alert show={show} variant='success'>
        <Alert.Heading>BENVENUTO!</Alert.Heading>
        <p>Questa è il mio Book Shop!</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={() => setShow(false)} variant='outline-success'>
            Chiudi
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Messaggio</Button>}
    </>
  )
}

export default Welcome
