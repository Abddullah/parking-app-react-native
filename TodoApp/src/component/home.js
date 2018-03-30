import React, { Component } from 'react';
import {
    StyleSheet,
    // Text,
    // View,
} from 'react-native';
import { Container, Button, Text, Content, Form, Item, Input, Label } from 'native-base';




export default class home extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Button info full onPress={() => this.props.navigation.navigate("signup")}><Text> Sign Up </Text></Button>
                        <Button info full onPress={() => this.props.navigation.navigate("signin")}><Text> Sign In </Text></Button>
                    </Form>
                    

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
    // welcome: {
    //     fontSize: 20,
    //     textAlign: 'center',
    //     margin: 10,
    // },
    // instructions: {
    //     textAlign: 'center',
    //     color: '#333333',
    //     marginBottom: 5,
    // },
});

