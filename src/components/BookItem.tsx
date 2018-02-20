import * as React from 'react'
import { Book } from '../store/BookStore'
import { Link } from 'react-router-dom'

interface IBook {
  book: Book
}

export default class BookItem extends React.Component<IBook, IBook> {
  render () {
    /**
     * Return null if the book is null
     */
    if (!this.props || !this.props.book) {
      return null
    }

    return <div key={this.props.book.ID} className="book-item">
      <div className="book-image">
        <img src={this.props.book.Image} alt=""/>
      </div>
      <div className="book-text">
        <Link to={`book/${this.props.book.ID}`}>{this.props.book.Title}</Link>
        <p>{this.props.book.Description}</p>
      </div>
    </div>
  }
}
