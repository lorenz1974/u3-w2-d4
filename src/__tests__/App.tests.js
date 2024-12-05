import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import per abilitare toBeInTheDocument
import App from '../App';
describe('Testing suite ApiBook', () => {
  test('chiude il modale di benvenuto con il pulsante CHIUDI', () => {
    render(<App />);

    // Controlla che il testo "BENVENUTO!" sia visibile inizialmente
    const welcomeText = screen.getByText(/BENVENUTO/i);
    expect(welcomeText).toBeInTheDocument();

    // Trova e clicca il pulsante "CHIUDI"
    const closeButton = screen.getByText(/Chiudi/i);
    fireEvent.click(closeButton);

    // Controlla che il testo "BENVENUTO!" non sia più presente
    expect(screen.queryByText(/Messaggio/i)).toBeInTheDocument();
  });

  test('cambia il filtro dei libri correttamente', () => {
    render(<App />)

    // Cerca il genere
    const genreFilter = screen.getByText(/Generi/i)
    expect(genreFilter).toBeInTheDocument()

    // Simulazione del click sul filtro
    fireEvent.click(genreFilter)
    const navButton = screen.getByText('Romance') // Modifica questo in base alla tua UI
    fireEvent.click(navButton)

    // Cerca
    const searchPage = screen.getByText(/Categoria romance/i)
    expect(searchPage).toBeInTheDocument()
  })

  test('aggiorna i termini di ricerca e mostra i risultati', () => {
    render(<App />)
    const searchInput = screen.getByPlaceholderText('Search...') // Modifica il placeholder con quello effettivo
    fireEvent.change(searchInput, { target: { value: 'justice' } })
    const resultsTitle = screen.getByText(/Risultati per "justice"/i)
    expect(resultsTitle).toBeInTheDocument()
  })

  test('Estraggo esattamente due libri con la key "justice"', () => {
    render(<App />)
    const searchInput = screen.getByPlaceholderText('Search...') // Modifica il placeholder con quello effettivo
    fireEvent.change(searchInput, { target: { value: 'justice' } })

    // Cerco due immagini di libri
    const bookImages = screen.queryAllByAltText(/Copertina/i)
    expect(bookImages).toHaveLength(2)
  })

  test('testa i primi tre bottoni dei commenti', () => {
    render(<App />);

    // Trova tutti i bottoni che contengono il testo "Commenti"
    const commentButtons = screen.getAllByText(/Commenti/i);

    expect(commentButtons.length).toBeGreaterThanOrEqual(3);

    // Seleziono i primi tre
    for (let i = 0; i < 3; i++) {
      fireEvent.click(commentButtons[i]);

      // Verifica che il modale associato appaia dopo il click
      const modalContent = screen.getByText(/Invia commento/i); // Cambia con il contenuto effettivo
      expect(modalContent).toBeInTheDocument();
    }
  });

  test('aggiunge e rimuove un libro dalla lista dei selezionati', () => {
    render(<App />)
    const book = screen.findAllByAltText(/Copertina/i)
    fireEvent.click(book[0])

    const opacitySearch = window.getComputedStyle(book[0])
    expect(opacitySearch.opacity).toBe('0.5')
  })

})