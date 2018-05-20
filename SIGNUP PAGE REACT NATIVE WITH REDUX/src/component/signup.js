import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail } from 'native-base';
import * as firebase from 'firebase'

import {
    StyleSheet,
    // Text,
    // View,
} from 'react-native';

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
        const uri = "http://emptyweb.net/uzura/wp-content/uploads/2012/07/image_1207_todo_01.png";

        return (
            <Container>
                <Content>
                    <Form>
                        <Thumbnail style={styles.imgSize} source={{ uri: uri }} />

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

                    <Text style={styles.marginText}
                        onPress={() => this.props.navigation.navigate("home")}>
                        have you already account?
                     </Text>
                </Content>
            </Container>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    imgSize: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 200,
    },
    footerColor: {
        backgroundColor: "#cc3333"
    },
    marginText: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 15
    }



});

