import React, {  useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import moment from 'moment';
import locale from 'moment/locale/fi';
import { ListItem, Header, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

const Holidays = ({navigation}) => {

  const [holidays, setHolidays] = useState([]);
  const [year, setYear] = useState('');
  const [findYear, setFindYear] = useState('');
  
  React.useEffect(() => { 
    fetchHolidays()
  }, []);
  
  fetchHolidays = () => {
    let year = moment().year().toString();
    setYear(year);
  
    const url = 'https://date.nager.at/api/v2/publicholidays/' + year + '/FI';
    
    fetch(url)
      .then((response) =>  response.json())
      .then((responseJson) =>  { 
        setHolidays(responseJson);
      })
      .catch((error) => { 
        Alert.alert('Error',  error); 
      });     
  }

  fetchNextHolidays = () => {
     const url = 'https://date.nager.at/api/v2/publicholidays/' + findYear + '/FI';
        
     fetch(url)
      .then((response) =>  response.json())
      .then((responseJson) =>  { 
        setHolidays(responseJson);
      })
      .catch((error) => { 
        Alert.alert('Error',  error); 
      });     
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

      <Text style={{textAlign:'center', fontSize:25, marginTop:10}}>Etsi vuoden perusteella</Text>
      <Input 
        placeholder="Vuosi"
        onChangeText={(findYear) => setFindYear(findYear)}
        inputContainerStyle={{marginLeft:43,marginRight:43}}
        value={findYear} 
      />
      <Button 
        type="outline"
        buttonStyle={{
          marginLeft: 50,
          marginRight: 50,
          marginTop: 20,
          marginBottom: 15,
          borderColor: "grey"
        }} 
        title="Etsi" 
        titleStyle={{
          color: "grey"
        }}
        onPress={fetchNextHolidays}
      />
    
      <ScrollView>
        <Text style={{textAlign:'center', fontSize:25}}>Pyhäpäivät</Text>
        {
          holidays.map((holiday, index) => (
            <ListItem
              key={index}
              title={holiday.localName}
              titleStyle={{fontSize: 20}}
              subtitle={moment(holiday.date).locale('fi', locale).format('dd D.M.Y')}
              subtitleStyle={{fontSize: 20}}
              bottomDivider
            />
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
});

export default Holidays;