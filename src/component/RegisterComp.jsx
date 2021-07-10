import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, CardImg } from 'reactstrap';
import axios from 'axios'
// import { AuthContext } from '../App'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';
const qs = require('querystring')
const baseUrl = 'http://localhost:3001'

function RegisterComp(props) {

    // const { dispatch } = useContext(AuthContext)

    const initialState = {
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const stateForm = {
        username: "",
        email: "",
        password: ""
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
                username: dataform.username,
                email: dataform.email,
                password: dataform.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post(baseUrl + '/auth/news/register', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true && res.data.isRegistered === false) {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Silahkan cek email untuk melakukan verifikasi!"
                        })

                        setDataForm({
                            ...dataform,
                            username: "",
                            email: "",
                            password: ""
                        })

                    }
                    else if (res.data.success === false && res.data.isRegistered === true) {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Email anda Telah terdaftar!"
                        })
                    }
                    else {
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
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg width="100%" src="https://media.bitdegree.org/storage/media/images/2018/08/what-is-a-web-developer.jpg" />
                    </Col>
                    <Col>
                        <h1>Registrasi Form</h1>

                        <hr />
                        <FormGroup>
                            {data.errorMessage && (
                                <div className="alert alert-success" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}
                        </FormGroup>

                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="username"
                                    id="exampleEmail"
                                    placeholder="Username Anda"
                                    value={dataform.username}
                                />
                            </FormGroup>
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
                                <Button disabled={data.isSubmitting}>
                                    {data.isSubmitting ? (
                                        "..Loading"
                                    ) :
                                        (
                                            "Register"
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

export default RegisterComp

