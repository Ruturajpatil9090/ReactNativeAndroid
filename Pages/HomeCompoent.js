import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Slide from "../Pages/Carousel"

const LoginComponent = (props) => {
  const handleNavigate = (page) => {
    props.navigation.navigate(page);
  };
  
  return (
    
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Slide />
      </View>
      <Text style={styles.headerText}></Text>
    
      <View style={styles.buttonContainer}>
    
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("SelfStock")}
        >
          <Text style={styles.buttonText}>Self Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("TodaysAnalysis")}
          
        >
          <Text style={styles.buttonText}>Todays Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("LOTWISEPNL")}
          
        >
          <Text style={styles.buttonText}>PNL</Text>
        </TouchableOpacity>

    

      </View>

      <View style={styles.buttonContainer1}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("monthlydispatch")}
          
        >
          <Text style={styles.buttonText}>Monthly Dispatch</Text>
        </TouchableOpacity>

      </View>
     

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop:10
  },
  button: {
    backgroundColor: '#324ab2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  carouselContainer: {
    height: 610, 
    width: '100%',
    marginVertical: -320, 
  },
  buttonContainer1:{
    flexDirection: 'row',
    marginTop:10,
    marginLeft:35
  }
});

export default LoginComponent;
