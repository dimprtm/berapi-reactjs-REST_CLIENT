import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container,
    Row, Col, CardFooter,
    InputGroup, Input,
    InputGroupAddon, Alert
} from 'reactstrap';
import './CSS/NewsComp.css'
import { Redirect, NavLink, Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3001'

function Publik() {

    const [news, setNews] = useState([]);

    useEffect(()=>{
        axios.get(baseUrl+'/news').then(res => {
            setNews(res.data.values)
        }).catch(e => {
            console.log(e)
        })
    },[])

    return (
        <Container className="text-light mt-5 news-comp">
                <Row className="align-items-center justify-content-sm-between">
                    <Col className="col-md-2">
                        <h3 className="">Portal Berita</h3>
                    </Col>
                    <Col className="col-md-3">
                        <InputGroup>
                            <Input className="bg-transparent text-light"/>
                            <InputGroupAddon addonType="append">
                                <Button color="btn btn-info" title="Cari"><i className="fa fa-search"></i></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <hr color="white" className="mb-4"/>
                <Row>
                {news.map(news =>
                    <Col key={news.id} className="col-lg-6 col-sm-12 col-12">
                        <Card className="mb-5 shadow-lg rounded" id="card">
                            <CardImg height="250px" src={news.urlToImage} alt={news.title}/>
                            <CardBody>
                                <CardTitle tag="h5">
                                    <a href={news.url} target="_blank" className="text-white card-link">{news.title}</a>
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{news.source} - {news.publishedAt}</CardSubtitle>
                                <CardText className="desc-text">{news.description}</CardText>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col className="col-md-9 col-8">
                                        <a href={news.url} target="_blank" className="text-white card-link">Selengkapnya</a>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
                </Row>
            </Container>
    )
}

export default Publik
