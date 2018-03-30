import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, List, ListItem } from 'native-base';
import { FlatList, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase'

export default class Todo extends Component {
    constructor() {
        super();
        this.state = {
            todo: '',
            currentTodo: null,
            flag: true
        }
        this.getTodos();
        // console.log(this.state.currentTodo)

    }


    add() {
        if (this.state.todo === "") {
            alert("add something")
        }
        else {
            let currentUserUid = firebase.auth().currentUser.uid;
            firebase.database().ref('/' + currentUserUid + "/todo").push({ todo: this.state.todo })
                .then(() => {
                    this.setState({ todo: '' })
                })

                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage)
                });
        }

    }



    getTodos() {
        let cloneCurrentTodo = []
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo").on('child_added', (data) => {
            let obj = data.val();
            obj.id = data.key;
            cloneCurrentTodo = cloneCurrentTodo.concat(obj);
            this.setState({ currentTodo: cloneCurrentTodo });
            // console.log(this.state.currentTodo)

        })


    }


    clear() {
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo").remove()

        this.setState({
            todo: '',
            currentTodo: null,

        })
        alert("dataClear")
        console.log(this.state.currentTodo)
    }



    render() {

        // var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Add Todo</Label>
                            <Input onChangeText={(e) => { this.setState({ todo: e }) }} value={this.state.todo} />
                        </Item>

                    </Form>
                    <Button info full onPress={this.add.bind(this)}>
                        <Text>Add! </Text>
                    </Button>
                    <Button danger full onPress={this.clear.bind(this)}>
                        <Text>Clear</Text>
                    </Button>


                    <View style={styles.container}>
                        <FlatList
                            data={this.state.currentTodo}
                            renderItem={({ item }) => <Text style={styles.item}>{item.todo}</Text>}
                        />
                    </View>


                </Content>
            </Container>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22

    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})