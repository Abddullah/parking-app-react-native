import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert } from 'native-base';
import * as firebase from 'firebase'

export default class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: 'admin@gmail.com',
            password: '123456'
        }
    }


    sign() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                alert("sign In")
                this.props.navigation.navigate("todo")


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
                        <Item fixedLabel last>
                            <Label>Email</Label>
                            <Input onChangeText={(e) => { this.setState({ email: e }) }} value={this.state.email} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(e) => { this.setState({ password: e }) }} value={this.state.password} />
                        </Item>
                    </Form>
                    <Button info full onPress={this.sign.bind(this)}>
                        <Text>Sign In! </Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}