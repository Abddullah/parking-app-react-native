import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, List, ListItem } from 'native-base';
import { FlatList, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase'

export default class Todo extends Component {
    constructor() {
        super();
        this.state = {
            todo: '',
            cloneCurrentTodo: [],
            updateFlag: false,
            flag: true,
            editObj: {},
            editIndex: ""
        }
        this.getTodos();
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
            let cloneCurrentTodovar = this.state.cloneCurrentTodo.concat(obj);
            this.setState({
                flag: false,
                cloneCurrentTodo: cloneCurrentTodovar
            });
        })

        firebase.database().ref('/' + currentUserUid + "/todo").on('child_changed', (data) => {
            let obj = data.val();
            obj.id = data.key;
            let updatedTodos = this.state.cloneCurrentTodo.slice(0, this.state.editIndex).concat(obj).concat(this.state.cloneCurrentTodo.slice(this.state.editIndex + 1));
            this.setState({
                flag: false,
                cloneCurrentTodo: updatedTodos
            });
        })
    }

    clear() {
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo").remove()

        this.setState({
            todo: '',
            cloneCurrentTodo: []

        })
        alert("dataClear")
    }

    del(index) {
        let cloneKey = this.state.cloneCurrentTodo[index].id
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo" + "/" + cloneKey).remove()
            .then((v) => {

                this.setState({
                    cloneCurrentTodo: this.state.cloneCurrentTodo.slice(0, index).concat(this.state.cloneCurrentTodo.slice(index + 1))
                });

            });

    }

    edit(index) {
        this.setState({
            updateFlag: true,
            editIndex: index,
            editObj: this.state.cloneCurrentTodo[index],
            todo: this.state.cloneCurrentTodo[index].todo
        })
    }

    todosUpdate() {
        let cloneEditObj = this.state.editObj;
        cloneEditObj.todo = this.state.todo;
        let updateKey = this.state.editObj.id;
        delete this.state.editObj.id;
        let currentUserUid = firebase.auth().currentUser.uid;
        firebase.database().ref('/' + currentUserUid + "/todo" + "/" + updateKey).set(this.state.editObj);

        this.setState({
            editObj: {},
            // editIndex: "",
            todo: "",
            updateFlag: false,
        })
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

                    {
                        (this.state.updateFlag === false) ?
                            (<Button info full onPress={this.add.bind(this)}>
                                <Text>Add! </Text>
                            </Button>) :
                            (<Button info full onPress={this.todosUpdate.bind(this)}>
                                <Text>Update! </Text>
                            </Button>)
                    }




                    {/* <Button info full onPress={this.add.bind(this)}>
                        <Text>Add! </Text>
                    </Button> */}
                    <Button danger full onPress={this.clear.bind(this)}>
                        <Text>Clear</Text>
                    </Button>


                    <View style={styles.container}>
                        <FlatList
                            data={this.state.cloneCurrentTodo}
                            renderItem={({ item, index }) =>
                                (
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 18 }} key={index}>
                                        <Text style={styles.item} style={{ width: 200, margin: 5 }}>{item.todo}</Text>
                                        <Button rounded danger onPress={this.del.bind(this, index)} style={{ width: 50, height: 30, margin: 5 }}>
                                            <Text>D</Text>
                                        </Button>
                                        <Button rounded warning onPress={this.edit.bind(this, index)} style={{ width: 50, height: 30, margin: 5 }}>
                                            <Text>E</Text>
                                        </Button>
                                    </View>
                                )
                            }
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