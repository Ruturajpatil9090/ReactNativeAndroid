import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, FlatList } from 'react-native'; // Remove TextInput from here
import { TextInput } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {API_KEY} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';



const Bill_TO_HelpComponent = ({ onSelectItem, onEnterValue }) => {
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [accoid, setAccoId] = useState(null);
  const itemsPerPage = 5;
  const [companyCode, setCompanyCode] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchCompanyCode();
  }, []);

  const fetchCompanyCode = async () => {
    try {
      const storedCompanyCode = await AsyncStorage.getItem('Company_Code');
      if (storedCompanyCode) {
        setCompanyCode(storedCompanyCode);
        setLoading(false); // Set loading to false once Company_Code is fetched
        fetchData(); // Fetch data after Company_Code is fetched
      } else {
        console.error('Company_Code not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving Company_Code:', error);
    }
  };

  const handleButtonPress = () => {
    console.log('Button Pressed with input value:', inputValue);
    fetchData();
    setModalVisible(true);
  };

  const fetchData = () => {
    if (!companyCode) return; // Exit if Company_Code is not available
    fetch(`http://${API_KEY}/api/tender/gethelper?Company_Code=${companyCode}`)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = (text) => {
    setInputValue(text);
    const filteredItems = postData.filter(
      (item) =>
        item.Ac_Name_E.toLowerCase().includes(text.toLowerCase()) ||
        item.Ac_Code.toString().includes(text)
    );

    setFilteredData(filteredItems);
    setPage(1); // Reset page to 1 when the search text changes
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleItemPress = (Ac_Code, Ac_Name_E, accoid) => {
    // Update the input value with the selected item's ID
    setInputValue(`${Ac_Code}`);

    // Store the selected item's ID and title in state
    setSelectedItemId(Ac_Code);
    setSelectedItemTitle(Ac_Name_E);
    setAccoId(accoid);

    // Close the modal
    setModalVisible(false);

    onSelectItem({ Ac_Code, Ac_Name_E, accoid });
    console.log("Bill to data all", Ac_Code, Ac_Name_E, accoid);
  };

  const handleInputChange = (text) => {
    // Update the input value
    setInputValue(text);

    // Look up the title for the entered ID
    const Ac_Code = parseInt(text, 10); // Parse the entered text as an integer
    const matchingItem = postData.find((item) => item.Ac_Code === Ac_Code);
    fetchData();
    // Update the selected item's ID and title in state
    if (matchingItem) {
      setSelectedItemId(matchingItem.Ac_Code);
      setSelectedItemTitle(matchingItem.Ac_Name_E);
      setAccoId(accoid);
    } else {
      // Clear the selected item if no match is found
      setSelectedItemId(null);
      setSelectedItemTitle('');
    }
    onEnterValue(text);
  };

  return (
    <View style={{ padding: 16 }}>

      <View style={styles.rowContainer}>
        <Text style={styles.textfeilds}>Broker:</Text>
        <TextInput
        style={styles.BillToStyle}
          mode="outlined"
          label="Broker"
          right={<TextInput.Affix />}
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <View style={styles.button}>
          <Button title="..." onPress={handleButtonPress} />

        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search.."
                value={inputValue}
                onChangeText={(text) => handleSearch(text)}
              />
              <Button title="X" onPress={() => setModalVisible(!modalVisible)} />
            </View>
            <FlatList
              data={filteredData.slice(startIndex, endIndex)}
              keyExtractor={(item) => item.Ac_Code.toString()}
              renderItem={({ item }) => (
                <View style={styles.card} onTouchEnd={() => handleItemPress(item.Ac_Code, item.Ac_Name_E, item.accoid)}>
                  <Text style={styles.cardText} >{` ${item.Ac_Code}`}</Text>
                  <Text style={styles.cardText}>{` ${item.Ac_Name_E}`}</Text>
                  <Text style={styles.cardText}>{`${item.cityname}`}</Text>
                  {/* <Text style={styles.cardText}>{`accoid: ${item.accoid}`}</Text> */}
                  {/* <Text>{`Short_Name: ${item.Short_Name}`}</Text> */}

                </View>
              )}
            />
            <View style={styles.paginationContainer}>
              <Button title="Previous" onPress={handlePrevPage} disabled={page === 1} />
              <Button title="Next" onPress={handleNextPage} disabled={endIndex >= filteredData.length} />
            </View>
          </View>
        </View>
      </Modal>

      {selectedItemId && (
        <View style={styles.TitleStyle}>
          <Text style={styles.text}>{`${selectedItemTitle}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -20,
    marginLeft: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 0,
    borderRadius: 8,
    fontSize: 12,
    marginLeft: 0,
    height: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
 
  },
  searchInput: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
    fontSize: 12,
    width: '80%',
    height: 20,
    marginBottom:10
   
  },
  card: {
    borderWidth: 1,
    borderColor: '#E6BBB3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,

  },
  cardText: {
    fontSize: 16,
    marginBottom: 0,
    color: '#7828D2',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textfeilds: {
    color: '#000000',
    marginLeft: 5,
    fontWeight: 'bold',
    marginRight: 20
  },
  button: {
    height: 40,
    marginLeft: 5,
    marginTop: 10

  },
  TitleStyle: {
    marginTop: 20,
    marginLeft: 95,
    color: '#8C1A69',
  },
  text: {
    color: '#8C1A69',
  },
  BillToStyle:{
   width:"60%"
  }
});

export default Bill_TO_HelpComponent;
