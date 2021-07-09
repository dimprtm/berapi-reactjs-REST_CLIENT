import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container,
    Row, Col, CardFooter,
    InputGroup, Input,
    InputGroupAddon, Alert
} from 'reactstrap';
import '../../component/CSS/NewsComp.css'
import { AuthContext } from '../../App';
import { Redirect, NavLink, Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3001'


const ListNews = (props) => {
    const [news, setNews] = useState([])
    const {state, dispatch} = useContext(AuthContext)

    const stateForm = {
        news: [],
        response: '',
        display: 'none'
    }

    const [dataform, setDataForm] = useState(stateForm)
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    const fetchData = () => {

        axios.get(baseUrl + '/auth/news', config)
        .then(res => {
            setNews(res.data.values)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const deleteNews = (id) => {
        axios.delete(baseUrl + `/auth/news/${id}`, config)
        .then(res => {
            if(res.data.status === 200) {
                setDataForm({
                    response: res.data.values,
                    news: news.filter(news => news.id !== id),
                    display: 'block'
                })
                alert('data id '+ id +' berhasil dihapus')
                window.location.reload()
                props.history.push('/admin')
            } else {
                alert('data gagal diahpus!')
                props.history.push('/admin')
            }
        })
    }

    const timeout = () => {
        setTimeout(() => {
            console.log("Token telah berakhir")
            dispatch({
                type: "LOGOUT"
            })
        }, state.tokenExpires)
    }

    useEffect(() => {
        fetchData()
        // eslint disable
        timeout()
    }, [])

    if(!state.isAuthenticated) {
        return <Redirect to="/login" /> 
    }

    return (
        <div className="">
            <Container className="text-light mt-5 news-comp">
                <Alert color="success" style={{display: dataform.display}}>{dataform.response}</Alert>
                <Row className="align-items-center justify-content-sm-between">
                    <Col className="col-md-2">
                        <h3 className="">Portal Berita</h3>
                    </Col>
                    <Col className="col-md-7">
                        <NavLink to="/news/insert" className="btn-success p-1 rounded" title="Tambah Data">
                            <i className="fa fa-plus"></i>
                        </NavLink>
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
                                    <Col className="col-md-1 col-2">
                                        <Link to={{
                                            pathname: `news/update`,
                                            state: {
                                                id: news.id,
                                                source: news.source,
                                                title: news.title,
                                                description: news.description,
                                                url: news.url,
                                                urlToImage: news.urlToImage
                                            }
                                        }} 
                                        className="btn btn-success" 
                                        title="Edit Data">
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                    </Col>
                                    <Col className="col-md-1 col-1 ml-md-4">
                                        <Button className="btn btn-danger" title="Hapus Data" onClick={() => deleteNews(news.id)}><i className="fa fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
                </Row>
            </Container>
        </div>
    )
}

export default ListNews;