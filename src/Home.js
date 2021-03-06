import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import firebase from './Firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';
//import moment from 'moment';

const Home = ({navigation}) => {

  const [meetings, setMeetings] = useState([]);
  const [id, setId] = useState('');

  //.orderByChild('date')
  React.useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      const keys = Object.keys(data);
      setMeetings(prods);
      setId(keys);
     // let sortedData = prods.sort((a,b) => a.date > b.date );   
    });
  }, []);

  const deleteMeeting = (index) => {
    firebase.database().ref('items/' + id[index]).remove();
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={ 
          <Icon 
            name='navicon' 
            color='#696969' 
            size={35}
            onPress={() => navigation.openDrawer()}
          />
        } 
        centerComponent={{
          text: 'The Meeter', 
          style: { 
            color: '#696969', 
            fontSize: 30 
          } 
        }}
        containerStyle={{
          backgroundColor: '#dcdcdc',
          justifyContent: 'space-around',
        }}
      />
  
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 25}}>Kokoukset</Text>
        </View>   
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
                    onPress={() => deleteMeeting(index)}
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
  },
  title: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
  }
});

export default Home;