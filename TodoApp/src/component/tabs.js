import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Slider, SafeAreaView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-simple-time-picker';
import { Container, Button, Content, Form, Item, Input, Label, Alert, Header, List, ListItem } from 'native-base';
import MaterialTabs from 'react-native-material-tabs';







export default class tabs extends Component {
    state = {

        selectedTab: 0

    };

    setTab(tab) {
        this.setState({ selectedTab: tab })
    }



    render() {
        // const { value } = this.state;


        return (
            <Container>
                <Content>
                    <View>
                        <SafeAreaView style={styles.container1}>
                            <MaterialTabs
                                items={['Book Parking', 'View Booking', 'Feedback', 'Logout']}
                                selectedIndex={this.state.selectedTab}
                                onChange={this.setTab.bind(this)}
                                barColor="#2d7d7c"
                                indicatorColor="#d9544e"
                                activeTextColor="#d9544e"
                                textStyle={{ fontFamily: 'Papyrus', fontWeight: "bold", fontSize: 13 }}
                            />
                        </SafeAreaView>
                        <List>
                            <ListItem itemDivider>
                                <Text>G</Text>
                            </ListItem>
                            <ListItem onPress={() => this.props.navigation.navigate("setbooking")}>
                                <Text >Gulshan e meymar</Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>K</Text>
                            </ListItem>
                            <ListItem >
                                <Text >Khadda Market</Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>P</Text>
                            </ListItem>
                            <ListItem >
                                <Text >Parking Plaza</Text>
                            </ListItem>

                        </List>

                    </View>
                </Content>

            </Container>

        );
    }

}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#663366',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',


    },
    container1: {
        flex: 1


    },

    slider: {

        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },


    text: {
        fontSize: 40,
        textAlign: 'center',
    },

});












