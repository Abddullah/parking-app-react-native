// import React, { Component } from 'react';
// import { Text, TouchableOpacity, View, StyleSheet, Slider, SafeAreaView } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import TimePicker from 'react-native-simple-time-picker';
// import { Container, Button, Content, Form, Item, Input, Label, Alert, Header } from 'native-base';
// import MaterialTabs from 'react-native-material-tabs';







// export default class DateTimePickerTester extends Component {
//     state = {
//         isDateTimePickerVisible: false,
//         selectedHours: 0,
//         selectedMinutes: 0,
//         value: 6,
//         location: "Gulshan e meymar"

//     };



//     _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

//     _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

//     _handleDatePicked = (date) => {
//         console.log('A date has been picked: ', date);
//         this._hideDateTimePicker();
//     };

//     change(value) {
//         this.setState(() => {
//             return {
//                 value: parseFloat(value),
//             };
//         });
//     }







//     render() {
//         const { selectedHours, selectedMinutes } = this.state;
//         const { value } = this.state;


//         return (
//             <Container>
//                 <Content>
//                     {/* ////////////////////////////////////////////////DATE/////////////////////////////////////////// */}
//                     <View style={styles.container}>
//                         <Button warning full>
//                             <TouchableOpacity onPress={this._showDateTimePicker}>
//                                 <Text style={styles.text}> Select Date </Text>
//                             </TouchableOpacity>
//                         </Button>
//                         <DateTimePicker
//                             isVisible={this.state.isDateTimePickerVisible}
//                             onConfirm={this._handleDatePicked}
//                             onCancel={this._hideDateTimePicker}
//                         />
//                     </View>


//                     {/* ////////////////////////////////////////////////TIME/////////////////////////////////////////// */}
//                     <View >
//                         <Text style={styles.text}>{selectedHours}:{selectedMinutes}</Text>
//                         <TimePicker
//                             selectedHours={selectedHours}
//                             selectedMinutes={selectedMinutes}
//                             onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
//                         />
//                     </View>


//                     {/* ////////////////////////////////////////////////SLIDER/////////////////////////////////////////// */}
//                     <View style={styles.slider}>
//                         <Text style={styles.text}>{String(value)}</Text>
//                         <Slider
//                             step={1}
//                             maximumValue={12}
//                             onValueChange={this.change.bind(this)}
//                             value={value}
//                         />
//                     </View>

//                     <Button info full >
//                         <Text>Select Slot</Text>
//                     </Button>
//                 </Content>

//             </Container>

//         );
//     }

// }




// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#663366',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',


//     },
//     container1: {
//         flex: 1


//     },

//     slider: {

//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',

//     },


//     text: {
//         fontSize: 40,
//         textAlign: 'center',
//     },

// });



import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
    constructor(props) {
        super(props)
        this.state = { date: "2018-05-24" }
    }

    render() {
        return (
            <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 4,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
            />
        )
    }
}










