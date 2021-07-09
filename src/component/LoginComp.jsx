import React, { Fragment, useContext, useState } from 'react'
import { 
    Button, Row, Col, 
    Form, FormGroup, 
    Label, Input, 
    Container 
} from 'reactstrap';
import axios from 'axios'
import { AuthContext } from '../App'
import { Link } from 'react-router-dom';

const qs = require('querystring')
const baseUrl = 'http://localhost:3001'

const LoginComp = (props) => {

    const { dispatch } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null
    }

    const stateForm = {
        email: "admin@gmail.com",
        password: "admin"
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
                email: dataform.email,
                password: dataform.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(baseUrl + '/auth/news/login', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true) {
                        dispatch({
                            type: "LOGIN",
                            payload: res.data
                        })

                        //redirect ke dashboard
                        props.history.push("/dashboard")
                    } else {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: res.data.Message
                        })
                    }

                    throw res
                })
                .catch(e => {
                    console.log(e)
                })
    }

    return (
        <Fragment>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col className="col-lg-4 col-md-8 col-sm-12">
                        <h1>Login Form</h1>

                        <hr color="white"/>

                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    type="email"
                                    onChange={handleInputChange}
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Email Anda"
                                    value={dataform.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    onChange={handleInputChange}
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password anda"
                                    value={dataform.password}
                                />
                            </FormGroup>
                            <FormGroup>
                                {data.errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {data.errorMessage}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Button disabled={data.isSubmitting} className="btn btn-success">
                                    {data.isSubmitting ? (
                                        "..Loading"
                                    ) :
                                        (
                                            "Login"
                                        )
                                    }
                                </Button>
                            </FormGroup>
                        </Form>
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default LoginComp

