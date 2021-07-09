import React, {useContext, useState} from 'react';
import {Container, FormGroup, Input,
    Row, Col, Button,
    Label, Alert, Form} 
from 'reactstrap'
import axios from 'axios';
import { AuthContext } from '../../App';
import { Link, Redirect } from 'react-router-dom';
const qs = require('querystring')

const baseUrl = 'http://localhost:3001';

const InsertNews = (props) => {

    const { state } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null
    }

    const stateForm = {
        source: '',
        title: '',
        description: '',
        url: '',
        urlToImage: '',
        response: '',
        display: 'none'
    }
    

    const [data, setData] = useState(initialState)
    const [dataform, setDataForm] = useState(stateForm)

    const handleInputChange = event => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value,
        })

    }

    const handleFormSubmit = event => {
        event.preventDefault()
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })

            const requestBody = {
                source: dataform.source,
                title: dataform.title,
                description: dataform.description,
                url: dataform.url,
                urlToImage: dataform.urlToImage
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + state.token
                }
            }

            axios.post(baseUrl + '/auth/news', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.status === 200) {
                        setDataForm({
                            response: res.data.values,
                            display: 'block'
                        })
                    } else {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: res.data.Message,
                            display: 'block'
                        })
                    }

                    throw res
                })
                .catch(e => {
                    console.log(e)
                })
    }

    if(!state.isAuthenticated) {
        return <Redirect to="/login" /> 
    }

    return (
        <Container className="mt-5">
            <Alert color="success" style={{display: dataform.display}}>{dataform.response}</Alert>
            <Row className="justify-content-center">
                <Col className="col-lg-10">
                    <Row className="align-items-center">
                        <Col className="col-1">
                            <Link to="/admin" className="text-white"><i className="fa fa-arrow-left"></i></Link>
                        </Col>
                        <Col className="col-11">
                            <h4>Form Tambah Data</h4>
                        </Col>
                    </Row>
                    <hr color="white" />
                    <Form onSubmit={handleFormSubmit} className="form">
                            <Label>Sumber</Label>
                            <FormGroup>
                                <Input type="text" name="source" value={dataform.source} onChange={handleInputChange} placeholder="Sumber"/>
                            </FormGroup>
                            <Label>Judul</Label>
                            <FormGroup>
                                <Input type="text" name="title" value={dataform.title} onChange={handleInputChange} placeholder="Judul"/>
                            </FormGroup>
                            <Label>Deskripsi</Label>
                            <FormGroup>
                                <Input type="text" name="description" value={dataform.description} onChange={handleInputChange} placeholder="Deskripsi"/>
                            </FormGroup>
                            <Label>URL</Label>
                            <FormGroup>
                                <Input type="text" name="url" value={dataform.url} onChange={handleInputChange} placeholder="URL"/>
                                    
                            </FormGroup>
                            <Label>URL Image</Label>
                            <FormGroup>
                                <Input type="text" name="urlToImage" value={dataform.urlToImage} onChange={handleInputChange} placeholder="URL Image"/>
                            </FormGroup>
                            <Button className="btn btn-success">Tambah</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default InsertNews;