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
            cloneCurrentTodo: [],
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
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo").on('child_added', (data) => {
            let obj = data.val();
            obj.id = data.key;
            this.state.cloneCurrentTodo = this.state.cloneCurrentTodo.concat(obj);
            this.setState({ currentTodo: this.state.cloneCurrentTodo });
        })
    }


    clear() {
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo").remove()

        this.setState({
            todo: '',
            currentTodo: null,
            cloneCurrentTodo: []

        })
        alert("dataClear")
        console.log(this.state.currentTodo)
    }




    del(index) {
        let cloneKey = this.state.currentTodo[index].id

        let currentUserUid = firebase.auth().currentUser.uid;

        firebase.database().ref('/' + currentUserUid + "/todo" + "/" + cloneKey).remove()


            .then((v) => {
                this.setState({
                    // cloneCurrentTodo: cloneCurrentTodo.slice(0, index).concat(cloneCurrentTodo.slice(index + 1)),
                    // flag:false


                });
            });
    }







    render() {
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
                            renderItem={({ item, index }) =>
                                (

                                    <View style={{ flex: 1, flexDirection: 'row', margin: 18 }} key={index}>
                                        <Text style={styles.item} style={{ width: 200, margin: 5 }}>{item.todo}</Text>

                                        <Button rounded danger onPress={this.del.bind(this, index)} style={{ width: 50, height: 30, margin: 5 }}>
                                            <Text>D</Text>
                                        </Button>
                                        <Button rounded warning onPress={this.add.bind(this)} style={{ width: 50, height: 30, margin: 5 }}>
                                            <Text>E</Text>
                                        </Button>

                                    </View>




                                )}
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
        paddingTop: 22,
        // margin:50


    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})