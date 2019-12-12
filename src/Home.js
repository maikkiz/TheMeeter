import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Button, Input, ListItem } from 'react-native-elements';
import firebase from './Firebase';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import moment from 'moment';

const Home = ({navigation}) => {

  //const{ navigate} = props.navigation;

  const [meetings, setMeetings] = useState([]);
  const [id, setId] = useState('');
  //const [isModalVisible, toggleModal] = useState(false);

 // const input1 = React.createRef();
  //const input2 = React.createRef();
  const input3 = React.createRef();

  //.orderByChild('date')
  React.useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      setId(keys);
      const prods = Object.values(data);
     // let sortedData = prods.sort((a,b) => a.date > b.date );
      
      setMeetings(prods);
      
      
    });
  }, []);

  const deleteMeeting = (index) => {
    firebase.database().ref('items/' + id[index]).remove();
    console.log(id[index])
  }

  console.log(meetings)

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
 

    <View style={styles.container}>
      <Text>Kokoukset</Text>
     
<ScrollView>
    {
      
      meetings.map((meeting, index) => (
        
            <ListItem
              key={index}
              title={meeting.date}//{moment(meeting.date).locale('fi', locale).format('dd D.M.Y')}
              titleStyle={{fontSize: 20}}
              subtitle={
                <View>
                  <Text>{meeting.time}</Text>
                  <Text>{meeting.place}</Text>
                </View>
              }
              subtitleStyle={{fontSize: 20}}
              rightIcon={
                <Icon 
                  name="trash" 
                  color="red" 
                  size={25} 
                  onPress={() => deleteMeeting(index)}   //lähetetään todon id delete metodille
                /> 
              }
              bottomDivider
            />
          ))
          
        }
        
</ScrollView>
</View>
    </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // alignItems: 'center',
   // justifyContent: 'center',
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

  export default Home;

  /*    <Modal isVisible={isModalVisible} toggle={toggleModal}>
                  <View style={{backgroundColor: "#fff", marginTop: 25, borderRadius: 10}}>
                  <Text>{meeting.date}</Text>
                    <Text>poo</Text>
                    <Text onPress={() => toggleModal(false)}>Sulje</Text>
                  </View>
                </Modal>*/
