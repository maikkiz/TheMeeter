import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Button, Input, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from './Firebase';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import moment from 'moment';

const AddMeeting = ({navigation}) => {

  //const{ navigate} = props.navigation;

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  //const [isModalVisible, toggleModal] = useState(false);

 // const input1 = React.createRef();
  //const input2 = React.createRef();
  const input3 = React.createRef();

  const saveMeeting = () => {
    firebase.database().ref('items/').push(
      {'date': date, 
      'time': time, 
      'place': place}
    );

    input3.current.clear();
    console.log(moment.utc(date, 'DD.MM.YYYY'));
    
  }


return (
  <View style={styles.container}>
  <Header
                leftComponent={ 
                  <Icon name= 'navicon' color= '#696969' size={35}
                  onPress={() => navigation.openDrawer()}
                  />
                } 
                centerComponent={{ text: 'The Meeter', style: { color: '#696969', fontSize: 30 } }}
                containerStyle={{
                    backgroundColor: '#dcdcdc',
                    justifyContent: 'space-around',
                }}
            />
   <DatePicker
        style={{width: '90%', marginTop:10}}
        date={date}
        mode="date"
        placeholder="Päivämäärä"
        format="DD.MM.YYYY"
        confirmBtnText="OK"
        cancelBtnText="Cancel"
        iconComponent={
          <Icon name="calendar"
          size={35}/>
        }
        customStyles={{
          dateInput: {
            margin: 15
          }
        }}
        onDateChange={date => setDate(date)}
      />
       <DatePicker
        style={{width: '90%', marginTop:10}}
        date={time}
        mode="time"
        placeholder="Aika"
        format="HH:mm"
        confirmBtnText="OK"
        cancelBtnText="Peruuta"
        androidMode="spinner"
      //  ref={input2}
        iconComponent={
          <Icon name="clock"
          size={35}/>
        }
        customStyles={{
          dateInput: {
            margin: 15,
            textAlign:'left' 
          },
          placeholderText: {
            textAlign:'left'
          }
          
        }}
        onDateChange={time => setTime(time)}
      />
<View style={styles.place}>
       <Input 
        placeholder='Paikka'
        inputContainerStyle={{marginLeft:43,marginRight:5}}
        onChangeText={place => setPlace(place)}
        value={place}
        ref={input3}
    
      />
         <Icon
            name='location'
            size={35}
          />
          </View>
      
      <Button buttonStyle={{margin: 15}} onPress={saveMeeting} onPressIn={() => navigation.openDrawer()} title=" Tallenna " />
    </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  place: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight:18,
    marginLeft:15,
    marginTop:15,
    marginBottom:15,
  }
  });

  export default AddMeeting;