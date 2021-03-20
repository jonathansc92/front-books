import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Input } from 'reactstrap';
import  api from "../services/api";
import Booklist from "../components/Booklist";

const Home = () => {

  const [book, setBook] = React.useState("");
  const [results, setResults] = useState([])
  
  useEffect(() => {
    const search = async () => {
      const { data } = await api.get("/books/search", {
        params: {
          q: book,
        },
      })
      setResults(data.items)
    }
    search()
  }, [book])

  return (
      <Container>
        <Row style={{padding: 50}}>
          <Col> 
            <Form>
              <Input value={book} type="text" placeholder="Search a Book" onChange={(e) => setBook(e.target.value)} />
            </Form>       
          </Col>
        </Row>
        <Row>
          { results.map((book, index) => (
              <Booklist 
                key={index}
                image={
                  book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail
                  : 'http://books.google.com/books/content?id=_odXAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                }
                title={book.volumeInfo.title}
                author={book.volumeInfo.author}
                volumeId={book.id}
              />
            ))
          }
        </Row>
    </Container>
  );
}

export default Home;