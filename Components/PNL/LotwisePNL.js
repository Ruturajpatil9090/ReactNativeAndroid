import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {API_KEY} from "@env"

const YourComponent = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${API_KEY}/api/tender/lotwisepnl`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


  const filteredData = data.filter(item =>
    item.Short_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{`Tender_No: ${item.Tender_No}`}</Text>
        <Text style={styles.itemText}>{`Tender_Date: ${item.Tender_Date}`}</Text>
        <Text style={styles.itemText}>{`Lifting_Date: ${item.Lifting_Date}`}</Text>
        <Text style={styles.itemText}>{`Short_Name: ${item.Short_Name}`}</Text>
        <Text style={styles.itemText}>{`Quantal: ${item.Quantal}`}</Text>
        <Text style={styles.itemText}>{`Purc_Rate: ${item.Purc_Rate}`}</Text>
        <Text style={styles.itemText}>{`Despqntl: ${item.despqntl}`}</Text>
        <Text style={[styles.itemText, { color: item.pnl < 0 ? 'red' : 'green' }]}>
        {`PNL: ${item.pnl}`}
      </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Short_Name"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius:50,
    width:'90%',
    marginLeft:20,
    padding:8
    
  },
  itemContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
    marginTop:0,
    borderColor: '#E6BBB3',
    borderWidth: 2,
    borderRadius: 28,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#324ab2',
    
  },
});

export default YourComponent;
