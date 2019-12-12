import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => (
    <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
    >
        <View style={styles.iconContainer}>
            <Icon name='assignment' size={50}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={{fontSize: 20}}>The Meeter</Text>
        </View>
        <DrawerItems {...props} />
    </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#dcdcdc"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#dcdcdc"
  }
});

export default CustomDrawer;
