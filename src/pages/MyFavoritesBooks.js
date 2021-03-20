import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import  api from "../services/api";
import Booklist from "../components/Booklist";

export default class MyFavoritesBooks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        books: []
      }
    }

    componentWillMount() {
        api.get("/booklist")
        .then(response => {
          this.setState({books: response.data.data })
        })
        .catch(err => {
          console.log('my favorites' + err)
        });
    }
  
    render() {    
      return (
        <>
            <Container style={{paddingTop: 20}}>
                <Row>
                    { this.state.books.map((book, index) => (
                        <Booklist 
                            key={index}
                            image={book.image}
                            title={book.name}
                            author={book.author}
                            volumeId={book.volume_id}
                            myFavorites={true}
                            booklistId={book.id}
                        />
                        ))
                }
                </Row>
            </Container>
        </>
      );
    }
  }