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

  get qrCodeUrl () {
    return `http://qrcode.online/img/?type=url&size=5&data=http://it-ebooks.info/book/${this.ID}/`
  }

}

export class BookDetail extends Book {
  Author: string
  ISBN: string
  Year: number
  Page: string
  Publisher: string
  Download: string
  Error: string
}

export interface SearchResult {
  Error: string,
  Time: number,
  Total: number,
  Page: number,
  Books: [Book]
}

class BookStore {

  fetchResult (url: string) {
    console.log('url', url)
    const response = fetch(url)
      .then(response => response.json())
    return Rx.Observable.fromPromise(response)
  }

  fetchSearchByPage (title: string, page: number) {
    const url = `http://it-ebooks-api.info/v1/search/${title}/page/${page}`
    return this.fetchResult(url)
  }

  fetchBookById (id: string) {
    const url = `http://it-ebooks-api.info/v1/book/${id}`
    return this.fetchResult(url)
  }

}

export default new BookStore()
