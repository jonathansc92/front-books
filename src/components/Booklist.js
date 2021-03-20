import React, { useState } from 'react';
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import  api from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Booklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booklistId: props.booklistId ? props.booklistId : null,
      volumeId: props.volumeId,
      image: props.image,
      title: props.title,
      author: props.author,
      favorite: false,
      myFavorites: props.myFavorites ? props.myFavorites : false
    }
    console.log(this.state)
  }

  addFavorites = (name, volumeId, image, author) => {
    api.post("/booklist", {
        name: name,
        image: image,
        author: author,
        volume_id: volumeId
    }).then(response => {
      this.setState({favorite: true })
      toast(response.data.data.message)
    })
    .catch(err => {
      console.log(err)
      toast('This book is in your favorite list. Please choose another book!')
    });
  }

  removeItem = (id) => {
    api.delete("/booklist/" + id)
    .then(response => {
      setTimeout(()=>{
        window.location.reload(false);
      }, 500);   
    })
    .catch(err => {
      console.log(err)
      toast('Fail to remove book')
    });
  }

  render() {    
    return (
      <>
        <Col xs="3">
          <Card>
            <CardImg top width="100%" src={this.state.image} alt={this.state.title} />
            <CardBody>
                <CardTitle tag="h6">{`${this.state.title.substring(0, 20)}...`}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{this.state.author}</CardSubtitle>
                { !this.state.myFavorites ?
                 !this.state.favorite ? 
                  <MdStarBorder  onClick={ () => this.addFavorites(this.state.title, this.state.volumeId, this.state.image, this.state.author) } />
                  : <MdStar  /> 
                : 
                  <Button color="danger" size="sm" onClick={ () => this.removeItem(this.state.booklistId) }>
                    <FaTrash /> Remove book
                  </Button> 
                }
            </CardBody>
          </Card>
        </Col>
        <ToastContainer />
      </>
    );
  }
}