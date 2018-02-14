import * as React from 'react'
import bookStore, { SearchResult } from '../store/BookStore'
import BookItem from './BookItem'
import * as ReactPaginate from 'react-paginate'

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

  render () {
    return <div className="search">
      <div className="search-header">
        <input className="search-header" type="text" placeholder="Type a book name...." value={this.state.name}
               onInput={this.onInput}
               onKeyDown={this.onKeyDown}/>
        <button className="search-cross" onClick={() => this.onReset()}>X</button>
      </div>
      <div className="search-result">
        {this.renderBooks()}
      </div>
      {this.renderPagination()}
    </div>
  }

  private onPageChange = (selectedItem: any) => {
    this.search(selectedItem.selected + 1)
  }

  private onReset = () => {
    this.setState({ name: '', searchResult: ({} as SearchResult) })
  }

  private onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).value
    this.setState({ name })
  }

  private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.name !== '') {
      this.search(1)
    }
  }

  private search = (page: number) => {
    bookStore.searchByPage(this.state.name, page)
      .subscribe(searchResult => {
        this.setState({ searchResult })
      })
  }

  private renderPagination () {
    if (this.state.searchResult && this.state.searchResult.Total > 0) {
      return <nav className="pagination" role="pagination">
        <ReactPaginate
          pageCount={40}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          previousLabel={'<'}
          nextLabel={'>'}
          previousClassName={'button'}
          nextClassName={'button'}
          onPageChange={(selected) => this.onPageChange(selected)}
        />
      </nav>
    }
    return null
  }

  private renderBooks () {
    const result = this.state.searchResult || ({} as SearchResult)
    return !result.Books ? null : result.Books.map(book => (
      <BookItem key={book.ID} book={book}/>
    ))
  }
}
