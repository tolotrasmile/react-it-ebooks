import * as React from 'react'
import bookStore, { SearchResult } from '../store/BookStore'

interface IProps {
  name: string
}

interface IState {
  name: string,
  searchResult?: SearchResult
}

export default class Main extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = { name }
  }

  componentDidMount () {
    bookStore.search('').subscribe(searchResult => this.setState({ searchResult }))
  }

  render () {
    return <div className="search">
      <div className="search-header">
        <input className="search-header"
               type="text"
               placeholder="Type a book name...."
               onInput={this.onChange}
               value={this.state.name}/>
        <button className="search-cross" onClick={() => this.onReset()}>X</button>
      </div>
      <div className="search-result">
        {this.renderBooks()}
      </div>
    </div>
  }

  private onReset = () => {
    this.setState({ name: '', searchResult: ({} as SearchResult) })
  }

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).value
    this.setState({ name })
    bookStore.search(name).subscribe(searchResult => this.setState({ searchResult }))
  }

  private renderBooks () {

    const result = this.state.searchResult || ({} as SearchResult)

    if (!result.Books) {
      return null
    }

    return result.Books.map(book => (
      <div key={book.ID} className="book-item">
        <div className="book-image">
          <img src={book.Image} alt=""/>
        </div>
        <div className="book-text">
          <h3>{book.Title}</h3>
          <p>{book.Description}</p>
        </div>
      </div>
    ))
  }

}
