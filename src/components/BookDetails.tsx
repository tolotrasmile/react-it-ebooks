import * as React from 'react'
import bookStore, { BookDetail } from '../store/BookStore'
import { match } from 'react-router'

interface IProps {
  id: string
  match?: match<any>
}

interface IState {
  book: BookDetail
}

export default class BookDetails extends React.Component<IProps, IState> {

  componentDidMount () {
    if (this.props.match) {
      bookStore.fetchBookById(this.props.match.params.id)
        .subscribe(book => {
          this.setState({ book })
        })
    }
  }

  render () {

    if (!this.state.book) {
      return null
    }

    if (this.state.book.Error !== '0') {
      return <h1 style={({ padding: 20, color: 'red' })}>{this.state.book.Error}</h1>
    }

    console.log(this.state.book)

    return <div key={this.state.book.ID}>
      <img src={this.state.book.qrCodeUrl} alt=""/>
      <div>
        <h3>{this.state.book.Title}</h3>
        <p>{this.state.book.Description}</p>
      </div>
    </div>
  }
}
