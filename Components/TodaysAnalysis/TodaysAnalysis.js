import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import {API_KEY} from "@env"

const TodaysAnalysis = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${API_KEY}/api/tender/managementtop`);
        const jsonData = await response.json();
        const top5Receipts = jsonData.Top_5_receipts;
        const Top_5_payments = jsonData.Top_5_payments;
        const Top_5_buyers = jsonData.Top_5_buyers;
        const Top_10_sellers = jsonData.Top_10_sellers;
        const Top_10_dispatch = jsonData.Top_10_dispatch;;
        const Top_10_pending_dispatch = jsonData.Top_10_pending_dispatch;
        const Top_10_debit_balance = jsonData.Top_10_debit_balance;
        const Top_10_credit_balance = jsonData.Top_10_credit_balance
        // Combine both sets of data
        setData([
          { title: 'RECEIPTS', data: top5Receipts },
          { title: 'PAYMENTS', data: Top_5_payments },
          { title: 'Buyers', data: Top_5_buyers },
          { title: 'Sellers', data: Top_10_sellers },
          { title: 'Dispatch', data: Top_10_dispatch },
          { title: 'Pending_Dispatch', data: Top_10_pending_dispatch },
          { title: 'Debit_balance', data: Top_10_debit_balance },
          { title: 'Credit_balance', data: Top_10_credit_balance },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(section => {
    const sectionTitle = section.title.toUpperCase();
    return sectionTitle.includes(searchQuery.toUpperCase());
  });

  const renderItem = ({ item, section }) => {
    let balanceColor = item.balance >= 0 ? 'green' : 'red';
    if (section.title === 'Buyers') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`Quantal: ${item.Quantal}`}</Text>
            <Text style={styles.itemText}>{`${item.buyername}`}</Text>
            
          </View>
        </TouchableOpacity>
      );
    } 
    else if (section.title === 'Sellers') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`Quantal: ${item.Quantal}`}</Text>
            <Text style={styles.itemText}>{`paymenttoname: ${item.paymenttoname}`}</Text>
            <Text style={styles.itemText}>{`Millname: ${item.millname}`}</Text>
            <Text style={styles.itemText}>{`Tender_date: ${item.tender_date}`}</Text>
          </View>
        </TouchableOpacity>
      );
    } 
    else if (section.title === 'Dispatch') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`Quantal: ${item.Quantal}`}</Text>
            <Text style={styles.itemText}>{`${item.billtoshortname}`}</Text>
           
          </View>
        </TouchableOpacity>
      );
    }
    else if (section.title === 'Pending_Dispatch') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`Quantal: ${item.Quantal}`}</Text>
            <Text style={styles.itemText}>{`${item.billtoshortname}`}</Text>
           
          </View>
        </TouchableOpacity>
      );
    }
    else if (section.title === 'Debit_balance') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={[styles.itemText, { color: balanceColor }]}>{`Balance: ${item.balance}`}</Text>
            <Text style={styles.itemText}>{`${item.Ac_Name_E}`}</Text>
            <Text style={styles.itemText}>{`City_Name: ${item.cityname}`}</Text>
           
          </View>
        </TouchableOpacity>
      );
    }
    else if (section.title === 'Credit_balance') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
          <Text style={[styles.itemText, { color: balanceColor }]}>{`Balance: ${item.balance}`}</Text>
            <Text style={styles.itemText}>{`${item.Ac_Name_E}`}</Text>
            <Text style={styles.itemText}>{`City_Name: ${item.cityname}`}</Text>
           
          </View>
        </TouchableOpacity>
      );
    }
    else if (section.title === 'PAYMENTS') {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
          <Text style={[styles.itemText]}>{`${item.Payment}`}</Text>
            <Text style={styles.itemText}>{`${item.Ac_Name_E}`}</Text>
           
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`${item.RECEIPTS}`}</Text>
            <Text style={styles.itemText}>{`${item.Ac_Name_E}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <SectionList
        sections={filteredData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      
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
    padding:10
    
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#324ab2',
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: '#0d98ba',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center', 
  },
});

export default TodaysAnalysis;
