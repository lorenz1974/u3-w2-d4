import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Component } from "react";
import { Row, Col } from "react-bootstrap";

// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// importa compnenti
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import BookList from "./components/BookList"
import MySearch from "./components/MySearch"
import MyComments from "./components/MyComments"

//Importa array libri
import fantasyBooks from './assets/fantasy.json'
import historyBooks from './assets/history.json'
import horrorBooks from './assets/horror.json'
import romanceBooks from './assets/romance.json'
import scifiBooks from './assets/scifi.json'

// Crea un megaarray di libri
export const booksArray = [
  ...fantasyBooks,
  ...historyBooks,
  ...horrorBooks,
  ...romanceBooks,
  ...scifiBooks,
].filter(
  (obj1, i, arr) => arr.findIndex((obj2) => obj2.asin === obj1.asin) === i
)
// Devo fare un filtro che estragga il primo ASIN tra i duplicati perché ci sono
// dei libri presenti in più categorie

// Setta le dimensioni degli elementi della pagina
document.getElementsByTagName('html')[0].classList.add('h-100')
document.getElementsByTagName('body')[0].classList.add('h-100')
//document.getElementById('root').classList.add('h-100')

// Classe App non coventita date le dimensioni dello state
class App extends Component {

  state = {
    bookFilter: 'history', // Variabile per tenere traccia del filtro selezionato
    modalShow: false, // Variabile che gestisce l'apparizione del modale
    modalContent: {
      asin: '',
      title: '',
      img: '',
      price: 0,
      category: '',
    },
    search: false,
    searchTerms: '',
    selectedBooks: [],
    comments: [],
    commentAppUser: 'l.lione@remoteitalia.com',
    isLoading: false,
    isError: false,
    update: false,
  }

  changeFilter = (label) => {
    this.setState({
      ...this.state,
      bookFilter: label
    })
    //console.log(`Filtro selezionato: ${label}`) // Per verificare
  }

  setSearchTerms = (terms, search) => {
    this.setState({
      ...this.state,
      searchTerms: terms,
      search: search,
    })
    //console.log(`setSearchTerms searchTerms è : ${terms}`) // Per verificare
    //console.log(`setSearchTerms search è : ${search}`) // Per verificare
  }

  setSelectedBooks = (asin) => {
    this.setState((prevState) => ({ // prevState è lo stato precedente fornito direttamente da React
      selectedBooks: prevState.selectedBooks.includes(asin)
        ? prevState.selectedBooks.filter((book) => book !== asin) // Rimuovi
        : [...prevState.selectedBooks, asin] // Aggiungi
    }));
    //console.log(`selectedBooks è: ${this.state.selectedBooks}`) // Per verificare
  };


  getComments = () => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDYyMDhhZDEyOTAwMTU4NzZiYzEiLCJpYXQiOjE3MzMxNDUxNDMsImV4cCI6MTczNDM1NDc0M30.b9vuC2wosIXVBrGf0AQwNBGmQXwsfYjq4W2ppICdxQA',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nella "response"')
        }
      })
      .then((arrayOfComments) => {
        //console.log('arrayOfComments', arrayOfComments)
        arrayOfComments.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
        this.setState({
          ...this.state,
          comments: arrayOfComments,
          isLoading: false,
          isError: false,
        })
      })
      .catch((err) => {
        //console.log(err)
        this.setState({
          ...this.state,
          isLoading: false,
          isError: true,
        })
      })
  }

  componentDidMount = () => {
    this.getComments()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.update !== prevState.update) {
      this.getComments()
      this.setState({
        ...this.state,
        update: false,
      })
    }
  }

  setAppState = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    })
  }


  render() {
    return (
      <div className="d-flex flex-column h-100">

        <header className="d-flex flex-column flex-shrink-0">
          <MyNav title="BookShop" changeFilter={this.changeFilter} fluid={true} />
          <Welcome />
        </header>

        <main className="container d-flex flex-column flex-grow-1">
          {this.state.searchTerms !== ''
            ? <h1 className='mt-5 text-capitalize'>Risultati per "{this.state.searchTerms}"</h1>
            : <h1 className='mt-5 text-capitalize'>Categoria {this.state.bookFilter}</h1>
          }
          <MySearch setSearchTerms={this.setSearchTerms} searchTerms={this.state.searchTerms}></MySearch>


          <Row>
            <Col className='col-9'>
              <BookList
                booksArray={booksArray}
                category={this.state.bookFilter}
                searchTerms={this.state.searchTerms}
                search={this.state.search}
                setSearchTerms={this.setSearchTerms}
                selectedBooks={this.state.selectedBooks}
                setSelectedBooks={this.setSelectedBooks}
                setAppState={this.setAppState}
                comments={this.state.comments}
              />
            </Col>

            <Col id='commentArea' className='col-3 mt-5'>
              {this.state.modalContent.asin.length > 0 &&
                <MyComments
                  comments={this.state.comments.filter(
                    (bookComments) =>
                      String(this.state.modalContent.asin) === String(bookComments.elementId)
                  )}
                  modalContent={this.state.modalContent}
                  setAppState={this.setAppState}
                  commentAppUser={this.state.commentAppUser} />}
            </Col>
          </Row>

        </main>

        <footer className="d-flex flex-column flex-shrink-0">
          <MyFooter />
        </footer>

      </div>
    );
  }

}

export default App;

library.add(fab, fas, far)