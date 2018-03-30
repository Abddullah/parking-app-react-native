import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert } from 'native-base';
import * as firebase from 'firebase'

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            userName: '',
            password: ''
        }
    }


    onSubmit() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {

                let user = {
                    email: this.state.email,
                    username: this.state.userName,
                    password: this.state.password
                }

                let currentUserUid = firebase.auth().currentUser.uid;
                firebase.database().ref('/' + currentUserUid + "/userDetails").set(user)

                    .then(() => {
                        alert("sign up")
                        this.props.navigation.navigate("signin")
                    })


            })


            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }



    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(e) => { this.setState({ userName: e }) }} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Email</Label>
                            <Input onChangeText={(e) => { this.setState({ email: e }) }} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(e) => { this.setState({ password: e }) }} />
                        </Item>
                    </Form>
                    <Button info full onPress={this.onSubmit.bind(this)}>
                        <Text>Signup! </Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}