import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY} from "@env"

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://117.248.109.218:90//api/tender/getcompanylist`)
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
      })
      .catch(error => {
        console.error('Error fetching company list:', error);
      });
  }, []);


  console.log("companies all navkar",companies)

  const navigateToHomePage = (Company_Code) => {
    // Save companyCode to AsyncStorage
    const stringifiedCompanyCode = String(Company_Code);
    AsyncStorage.setItem('Company_Code', stringifiedCompanyCode)
      .then(() => {
        // Navigate to HomePage
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Error saving company code:', error);
      });
  };

  return (
    <View style={styles.container}>
      {companies.map(company => (
        <TouchableOpacity key={company.Company_Code} onPress={() => navigateToHomePage(company.Company_Code)}>
          <View style={styles.companyContainer}>
            <Text style={styles.companyText}>{company.Company_Code} - {company.Company_Name_E}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  companyContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  companyText: {
    fontSize: 16,
    color: '#106659', 
  },
});

export default CompanyList;
