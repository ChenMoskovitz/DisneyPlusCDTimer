import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View ,TouchableOpacity, I18nManager, Linking} from 'react-native';
import React, {useState } from 'react';
import {useFonts} from "@use-expo/font";


const customFonts = {
  disney: require("./assets/fonts/waltograph42.ttf"),
  disneyB: require("./assets/fonts/waltographUI.ttf")
};



export default function App() {
  const [date, set_date] = useState('');
  const [isloaded] = useFonts(customFonts);
  if(!isloaded){
    return(
      <View>
        <Text>page is loading</Text>
      </View>
    );
  }

  function get_date(){
    let disneyDay = new Date('JUN 16, 2022 08:00:00');
    let currentDate = new Date();
    let remainingTime = disneyDay.getTime()-currentDate.getTime();
    let day = Math.floor(remainingTime/(1000*60*60*24));
    let hour = Math.floor((remainingTime%(1000*60*60*24))/(1000*60*60));
    let minutes = Math.floor((remainingTime%(1000*60*60))/(1000*60));
    let second = Math.floor((remainingTime%(1000*60))/1000);
    
    let stringDate;
    if(!I18nManager.isRTL){
      stringDate = day+' : '+hour+' : '+minutes+' : '+second
    }
    if(I18nManager.isRTL)
      stringDate = second+' : '+minutes+' : '+hour+' : '+day

    set_date(stringDate)
  }
  setInterval(get_date,1000);
  
  return (
    <ImageBackground source={require('./assets/img1.jpeg')} resizeMode="cover" style={styles.img}>
      <View style={{...styles.container,backgroundColor: "rgba(0,0,0,0.3)",paddingTop: 80,    height: '100%'}}>
        <Text style={styles.title}>Disney+</Text>
        <Text style={styles.text}>day : hour : min : sec</Text>
        <Text style={styles.textDate}>{date}</Text>
        <Text style={styles.text}>untill the magic is here!</Text>
        <StatusBar style="auto" />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={()=>Linking.openURL("https://www.apps.disneyplus.com/il/pre_launch?gclid=Cj0KCQjw4uaUBhC8ARIsANUuDjUxaLV6Rc6kCvyEnqdX-0WDowcCAff61hcHBWVqXvJCQy6SsCygfJwaAkUYEALw_wcB")}>
            <Text style={styles.textButton}>go to disney</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%',

  },
  buttonView: {
    // backgroundColor: "rgba(0,0,0,0.3)",
    width: '100%',
    alignItems: "center",

  },
  button: {
    borderRadius: 5,
    width: 200,
    height: 60,
    //backgroundColor: "rgba(0, 0, 0, 0.9)",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 20,
    color:"white",
    borderWidth: 0.5,
    borderColor: "white",
    marginTop: 20
},
textButton: {
  fontFamily: 'disney',
    color:'white',
    fontSize: 40,
    fontWeight: "400",
},
  container: {
    flex: 1,
    //backgroundColor:'#131a47',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title:{
    fontFamily: 'disney',
    textShadowColor: 'black',
    
    color:'white',
    fontSize: 100
  },
  textDate:{
    fontFamily: 'disney',
    color:'white',
    fontSize: 60,
    fontWeight: "400",
  },
  text:{
    fontFamily: 'disney',
    color:'white',
    fontSize: 50
  }
});
