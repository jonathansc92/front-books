import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Input,   Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import  api from "../services/api";
import imgDefault from 'http://books.google.com/books/content?id=Fgx6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';

const Search = (props) => {

  const [book, setBook] = React.useState("");
  const [results, setResults] = useState([])

  const findBook = (e) => {
    if (e.charCode === 13) {
      alert(setBook(e.target.value))
    }
  }

  useEffect(() => {
    console.log(book)
    const search = async () => {
      const { data } = await api.get("/books/search", {
        params: {
          q: book,
        },
      })
      console.log(data)
      setResults(data.items)
    }
    search()
  }, [book])

  return (
      <Container>
        <Row style={{padding: 50}}>
          <Col> 
            <Form>
              <Input value={book} type="text" placeholder="Pesquise um Livro" onChange={(e) => setBook(e.target.value)} />
            </Form>       
          </Col>
        </Row>
        <Row>
          {results.map((result) => (
            <Col xs="2" style={{paddingBottom: 50}}>
            <Card>
        <CardImg top width="100%" src={imgDefault} alt={result.volumeInfo.title} />
        <CardBody>
          <CardTitle tag="h6">{`${result.volumeInfo.title.substring(0, 20)}...`}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{result.volumeInfo.author}</CardSubtitle>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </Col>               
            ))}
        </Row>
    </Container>
  );
}

export default Search;