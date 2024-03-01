import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {API_KEY} from "@env";

const SelfStockUtility = ({ route }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [balanceQuatal, setBalanceQuatal] = useState({});
  const [companyCode, setCompanyCode] = useState(null); // State to store Company_Code

  useEffect(() => {
    // Fetch Company_Code from AsyncStorage when the component mounts
    fetchCompanyCode();
  }, []);

  
  useEffect(() => {
    // Update balanceQuatal when route params change
    if (route.params && route.params.balanceQuatal) {
      setBalanceQuatal(route.params.balanceQuatal);
    }
  }, [route.params]);


  console.log("SelfStockUtility after navigation ", balanceQuatal);

  // Function to fetch Company_Code from AsyncStorage
  const fetchCompanyCode = async () => {
    try {
      const storedCompanyCode = await AsyncStorage.getItem('Company_Code');
      if (storedCompanyCode) {
        setCompanyCode(storedCompanyCode);
      } else {
        console.error('Company_Code not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving Company_Code:', error);
    }
  };

  useEffect(() => {
    // Fetch data when companyCode changes
    if (companyCode) {
      fetchData();
    }
  }, [companyCode]);

  // Function to fetch data using companyCode
  const fetchData = async () => {
    try {
      const response = await fetch(`http://${API_KEY}/api/tender/tenderdataall?Company_Code=${companyCode}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle card click
  const handleCardClick = (item) => {
    navigation.navigate('SelfStockTenderPurchase', { data: item, balanceQuatal });
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.millshortname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardClick(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{`Tender NO: ${item.Tender_No}`}</Text>
          <Text style={styles.itemText}>{`TenderId: ${item.tenderid}`}</Text>
          <Text style={styles.itemText}>{`Mill Short Name: ${item.millshortname}`}</Text>
          <Text style={styles.itemText}>{`Grade: ${item.Grade}`}</Text>
          <Text style={styles.itemText}>{`Mill Rate: ${item.Mill_Rate}`}</Text>
          <Text style={styles.itemText}>{`Tender Date: ${item.Tender_Date}`}</Text>
          <Text style={styles.itemText}>{`Tender Short Name: ${item.tenderdoshortname}`}</Text>
          <Text style={styles.itemText}>{`Purchase Rate: ${item.Purc_Rate}`}</Text>
          <Text style={[styles.itemText, { color: (balanceQuatal?.Buyer_Quantal || item.BALANCE) < 0 ? 'red' : 'green' }]}>
            {`Balance: ${balanceQuatal?.Buyer_Quantal || item.BALANCE}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by MillShortName"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList data={filteredData} renderItem={renderItem} />
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
    borderRadius: 50,
    width: '90%',
    marginLeft: 20,
    padding: 10
  },
  itemContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
    marginTop: 0,
    borderColor: '#E6BBB3',
    borderWidth: 2,
    borderRadius: 28,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#324ab2',
  }
});

export default SelfStockUtility;
