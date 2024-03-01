import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {API_KEY} from "@env"

const YearlyBalanceComponent = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://${API_KEY}/api/tender/yearlybalance`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupDataByYearCode = () => {
    const groupedData = {};

    data.forEach((item) => {
      if (!groupedData[item.Year_Code]) {
        groupedData[item.Year_Code] = [];
      }
      groupedData[item.Year_Code].push(item);
    });

    // Convert the groupedData object into an array
    return Object.values(groupedData).sort((a, b) => b[0].Year_Code - a[0].Year_Code);
  };

  const handleCardPress = (item) => {
    const { yr, mn } = item;
    navigation.navigate('Monthlydetaildispatch', { year: yr, month: mn });
  };

  const renderYearlyBalanceGroup = (groupedDataArray) => {
    return groupedDataArray.map((group, index) => (
      <View key={index}>
      
        <Text style={styles.header}> Year Code : {group[0].Year_Code}</Text>
        
        {group.map((item, itemIndex) => (
          <TouchableOpacity
            key={itemIndex}
            style={styles.card}
            onPress={() => handleCardPress(item)}
          >
           
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Year: {item.yr}</Text>
              <Text style={styles.text}>Month: {item.mn}</Text>
              <Text style={styles.text}>Ton: {item.tons}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {renderYearlyBalanceGroup(groupDataByYearCode())}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    marginBottom: 0,
    borderRadius: 25,
    padding: 0,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',  
    backgroundColor: '#0d98ba',  
    padding: 10,  
    borderRadius: 8,  
    marginTop:20
  },
  itemContainer: {
    marginBottom: -8,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#E6BBB3',
    display:"row"
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#324ab2',
  },
});

export default YearlyBalanceComponent;
