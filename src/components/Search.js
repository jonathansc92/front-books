import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Input, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import  api from "../services/api";
import { MdStarBorder } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {

  const [book, setBook] = React.useState("");
  const [results, setResults] = useState([])
  
  const addFavorites = (name, volumeId) => {
      api.post("/booklist", {
          name: name,
          volume_id: volumeId
      }).then(response => {
        toast(response.data.data.message)
      })
      .catch(err => {
        toast('Este livro já está em seus favoritos')
      });
  }
  
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
              <Input value={book} type="text" placeholder="Pesquise um Livro" onChange={(e) => setBook(e.target.value)} />
            </Form>       
          </Col>
        </Row>
        <Row>
            { results.length > 0 ? (
             results.map((book) => (
                <Col xs="3">
                    <Card>
                        <CardImg top width="100%" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        <CardBody>
                            <CardTitle tag="h6">{`${book.volumeInfo.title.substring(0, 20)}...`}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{book.volumeInfo.author}</CardSubtitle>
                            <Button color="primary" size="sm" onClick={ () => addFavorites(book.volumeInfo.title, book.id) }>
                            <MdStarBorder  /> Adicionar aos Favoritos
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                ))
            ) : ( <Col>Nenhum Livro Encontrado</Col>
            )}
        </Row>
        <ToastContainer />
    </Container>
  );
}

export default Search;