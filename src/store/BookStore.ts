import 'whatwg-fetch'
import * as Rx from 'rxjs'

export class Book {

  ID: number
  Title: string
  SubTitle: string
  Description: string
  Image: string
  isbn: string

  get link () {
    return `http://it-ebooks-api.info/v1/book/${this.ID}`
  }
}

export class BookDetail extends Book {
  Author: string
  ISBN: string
  Year: number
  Page: number
  Publisher: string
  Download: string
}

export interface SearchResult {
  Error: string,
  Time: number,
  Total: number,
  Page: number,
  Books: [Book]
}

interface Callback {
  (result: SearchResult): void
}

class BookStore {

  search (title: string) {
    return this.searchByPage(title, 1)
  }

  searchByPage (title: string, page: number) {
    const response = fetch(`http://it-ebooks-api.info/v1/search/${title}/page/${page}`)
      .then(response => response.json())

    return Rx.Observable.fromPromise(response)
  }
}

export default new BookStore()
