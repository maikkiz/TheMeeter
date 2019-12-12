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

  const [date, setDate] = useState();
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
            <View style={styles.pickers}>
                <Text style={{fontSize: 25, marginBottom:5}}>Uusi kokous</Text>
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
            margin: 15,
            borderRadius:3
          },
          placeholderText: {
            textAlign:'left',
            fontSize:18
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
            textAlign:'left',
            borderRadius:3 
          },
          placeholderText: {
            textAlign:'left',
            fontSize:18
          }
          
        }}
        onDateChange={time => setTime(time)}
      />
      </View>
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
      <View style={{width:'100%', flex:1, flexDirection:'row', marginTop:15}}>
      <View style={{flex:6}}>
      <Button 
      type="outline"
      buttonStyle={{
        marginLeft: 32,
        marginRight: 6,
        
        marginBottom: 15,
        borderColor: "grey",
      //  width: "90%"
        }} 
        title="Etsi" 
        titleStyle={{
          color: "grey"
        }} 
        onPress={saveMeeting} 
        onPressIn={() => navigation.openDrawer()} 
        title=" Tallenna " />
         </View>
        <View style={{flex:1, marginLeft:10, marginRight:3, marginTop:3}}>

<Icon
            name='plus'
            size={35}
            
          />
          </View>
           </View>
           </View>
        
    
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  pickers: {
    alignItems: 'center',
    marginTop:10,
  },

  place: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight:18,
    marginLeft:15,
    marginTop:15,
    marginBottom:15,
  },
  button: {
    justifyContent: 'space-around',
    flexDirection: 'row',
 //   marginRight:18,
 //   marginLeft:15,
 //   marginTop:15,
  //  marginBottom:15,  
  }
  });

  export default AddMeeting;