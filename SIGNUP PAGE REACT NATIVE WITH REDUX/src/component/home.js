import React, { Component } from 'react';
import {
    StyleSheet,
    // Text,
    // View,
} from 'react-native';
import * as firebase from 'firebase'



import { Container, Button, Text, Content, Form, Item, Input, Label, Image, View, Thumbnail, Header, Alert, Footer, FooterTab } from 'native-base';




export default class home extends Component {

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
                this.props.navigation.navigate("example")


            })


            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }









    render() {
        // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        const uri = "http://emptyweb.net/uzura/wp-content/uploads/2012/07/image_1207_todo_01.png";
        const createLogo = "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-2/512/add_user_plus_male-256.png";

        return (
            <Container>
                <Content>
                    <Form>
                        <Thumbnail style={styles.imgSize} source={{ uri: uri }} />

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


                        <Button info full onPress={this.sign.bind(this)}>
                            <Text>Sign In! </Text>
                        </Button>





                        {/* <Button info full onPress={() => this.props.navigation.navigate("signup")}><Text> Sign Up </Text></Button> */}
                        {/* <Button info full onPress={() => this.props.navigation.navigate("signin")}><Text> Sign In </Text></Button> */}

                    </Form>
                    <View>
                        <Text style={styles.marginText}
                            onPress={() => this.props.navigation.navigate("signup")}>
                            Create new Account
                    </Text>
                    {/* <Thumbnail style={styles.imgSizeLogo} source={{ uri: createLogo }} /> */}

                    </View>


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
    imgSizeLogo: {
        width: 80,
        height: 80,
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

