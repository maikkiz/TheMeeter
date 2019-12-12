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

      <Input 
        placeholder="Vuosi"
        onChangeText={(findYear) => setFindYear(findYear)}
        inputContainerStyle={{marginLeft: 15, marginRight: 15}}
        value={findYear} 
      />
      <Button buttonStyle={{margin: 15}} title="Etsi" onPress={fetchNextHolidays}/>
      <ScrollView>
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