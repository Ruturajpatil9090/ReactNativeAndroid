import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView,ActivityIndicator,Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import BillComponent from "./SoudaBookHelps/BillTO_HelpComponent";
import ShipComponent from "./SoudaBookHelps/ShipTOHelpComponent";
import Broker from "./SoudaBookHelps/Broker_help_Compoent";
import SubBroker from "./SoudaBookHelps/SubBroker_Help_Compoent";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import {API_KEY} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const SelfStockTenderPurchase = () => {
  const [selectedItem, setSelectedItem] = useState({ id: null, title: '' });
  const [enteredValue, setEnteredValue] = useState('');
  const [deliveryType, setDeliveryType] = useState('C');
  const [saleQuantale, setSaleQuantale] = useState(0);
  const [saleRate, setSaleRate] = useState(0);
  const [comment, setComment] = useState('');
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [buyer, setBuyer] = useState(0);
  const [shipTo, setShipTo] = useState(0);
  const [subBroker, setSubBroker] = useState(0)
  const [broker, setBroker] = useState(0)
  const [accoid, setAccoId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyCode, setCompanyCode] = useState(null);
  
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  console.log("all data:", data)

  //Bill To 
  const handleSelectItem = ({ Ac_Code, Short_Name, accoid }) => {
    setSelectedItem({ id: Ac_Code, title: Short_Name });
    setEnteredValue(Short_Name);
    setBuyer(Ac_Code);
    setAccoId(accoid)
    console.log(`Value entered id is the`, buyer);
  };

  const handleEnterValue = (value) => {
    setEnteredValue(value);
    setBuyer(value)
    setAccoId(value)
    console.log(`Value entered in buyer:`, value);
  };

  //Ship To
  const handleSelectItemShip = ({ Ac_Code, Short_Name, accoid }) => {
    setSelectedItem({ id: Ac_Code, title: Short_Name });
    setEnteredValue(Short_Name);
    setShipTo(Ac_Code)
    setAccoId(accoid)
    console.log(`Value entered id is the`, shipTo);
    console.log(`Value accoId id is the`, accoid);
  };

  const handleEnterValueShip = (value) => {
    setEnteredValue(value);
    setShipTo(value)
    setAccoId(value)
    console.log(`Value entered in :`, value);
  };

  //Broker
  const handleSelectItemBroker = ({ Ac_Code, Short_Name, accoid }) => {
    setSelectedItem({ id: Ac_Code, title: Short_Name });
    setEnteredValue(Short_Name);
    setBroker(Ac_Code)
    setAccoId(accoid)
    console.log(`Value entered id is the`, Ac_Code);
  };
  const handleEnterValueBroker = (value) => {
    setEnteredValue(value);
    setAccoId(value);
    setBroker(value);
    console.log(`Value entered id is the`, value);
  };

  //Sub Broker
  const handleSelectItemSubBroker = ({ Ac_Code, Short_Name, accoid }) => {
    setSelectedItem({ id: Ac_Code, title: Short_Name });
    setEnteredValue(Short_Name);
    setSubBroker(Ac_Code);
    setAccoId(accoid)
    console.log(`Value entered id is the`, Ac_Code);
  };

  const handleEnterValueSubBroker = (value) => {
    setEnteredValue(value);
    setSubBroker(value);
    setAccoId(value)

    console.log(`Value entered id is the`, value);
  };

  //Narration input feild state management
  const handleCommentChange = (value) => {
    setComment(value);
  };


//logic for that required feilds 
const requiredFields = ['Bill To', 'Ship To', 'Broker', 'Sub Broker', 'SQuantal', 'SaleRate'];

  // Logic to check if all required fields are filled
  const allFieldsFilled = () => {
    return (
      buyer !== 0 && 
      shipTo !== 0 && 
      broker !== 0 && 
      subBroker !== 0 && 
      saleQuantale !== 0 && 
      saleRate !== 0
    );
  };

  // Function to show alert for missing fields
  const showMissingFieldsAlert = () => {
    const missingFields = requiredFields.filter(field => {
      switch (field) {
        case 'Bill To':
          return buyer === 0;
        case 'Ship To':
          return shipTo === 0;
        case 'Broker':
          return broker === 0;
        case 'Sub Broker':
          return subBroker === 0;
        case 'SQuantal':
          return saleQuantale === 0;
        case 'SaleRate':
          return saleRate === 0;
        default:
          return false;
      }
    });
  
    Alert.alert(
      'Missing Fields',
      `Required Fields: ${missingFields.join(', ')}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };

  // Handler for update button press
  const handleUpdate = async () => {
    if (allFieldsFilled()) {
      setIsConfirmationModalVisible(true);
    } else {
      showMissingFieldsAlert();
    }
  };


  useEffect(() => {
    fetchCompanyCode();
  }, []);

  // Fetch Company_Code from AsyncStorage
  const fetchCompanyCode = async () => {
    try {
      const storedCompanyCode = await AsyncStorage.getItem('Company_Code');
      // Use the retrieved Company_Code in your state
      setCompanyCode(storedCompanyCode);
    } catch (error) {
      console.error('Error retrieving Company_Code:', error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      setIsLoading(true);
      const currentDate = new Date().toISOString().split('T')[0];

      const response = await axios.put(`http://${API_KEY}/api/tender/updatetender?tenderid=${data.tenderid}`, {
        headData: {
          Company_Code: data.Company_Code,
          Year_Code: data.year_code
        },
        detailData: [
          {
            rowaction: 'add',
            Tender_No: data.Tender_No,
            Company_Code: companyCode,
            Buyer: buyer,
            ShipTo: shipTo,
            Buyer_Quantal: saleQuantale,
            Sale_Rate: saleRate,
            Sauda_Date: currentDate,
            Lifting_Date: data.Lifting_Date,
            Narration: comment,
            Buyer_Party: broker,
            buyerpartyid: accoid,
            AutoID: 2,
            IsActive: 0,
            year_code: 2,
            Branch_Id: 1,
            Delivery_Type: deliveryType,
            sub_broker: subBroker,
            shiptoid: accoid,
            buyerid: accoid,
            Commission_Rate: 0,
            tcs_rate: 0,
            gst_rate: 5,
            sbr: accoid,
            tcs_amt:0,
            CashDiff:0
          }
        ]
      });

      const updatedQuantalResponse = await axios.get(`http://${API_KEY}/api/tender/getupdatedquantal?Quantal=${saleQuantale}&Company_Code=4`);

      const Balanace_Quatal = updatedQuantalResponse.data

      console.log('Updated Quantal get new:',Balanace_Quatal );

      setTimeout(() => {
        setIsLoading(false);
        setIsConfirmationModalVisible(false);
        navigation.navigate('SelfStock', { balanceQuatal: Balanace_Quatal });

      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error updating data:', error);
    }
  };


  const handleCancelUpdate = () => {
    setIsConfirmationModalVisible(false);
  };

  const handleBack = () => {
    navigation.navigate('SelfStock');
  }
  return (
    <ScrollView style={styles.container}>
      <View>

        <BillComponent onSelectItem={handleSelectItem} onEnterValue={handleEnterValue} />
        <ShipComponent onSelectItem={handleSelectItemShip} onEnterValue={handleEnterValueShip} />
        {/* Added Row for Delivery Type */}
        <View style={styles.deliveryTypeContainer}>
          <Text style={styles.textfields}>DeliveryType:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={deliveryType}
              onValueChange={(itemValue, itemIndex) => setDeliveryType(itemValue)}
              itemStyle={styles.pickerItemStyle}
              style={styles.pickerStyle}
            >
              <Picker.Item label="Commission" value="C" />
              <Picker.Item label="With GST Naka Delivery" value="N" />
              <Picker.Item label="Naka Delivery without GST Rate" value="A" />
              <Picker.Item label="DO" value="D" />
            </Picker>
          </View>
        </View>
        <Broker onSelectItem={handleSelectItemBroker} onEnterValue={handleEnterValueBroker} />
        <SubBroker onSelectItem={handleSelectItemSubBroker} onEnterValue={handleEnterValueSubBroker} />

        <View style={styles.inputContainer}>
          <Text style={styles.textfields}>SQuantal:</Text>
          <TextInput
          mode="outlined"
          label="Quantal"
          right={<TextInput.Affix />}
          value={saleQuantale}
          onChangeText={(text) => setSaleQuantale(text)}
          keyboardType="numeric"
        />
     
        </View>

        {/* Added Text Input for Sale Rate */}
        <View style={styles.inputContainer}>
          <Text style={styles.textfields}>SaleRate:</Text>
          <TextInput
          mode="outlined"
          label="SaleRate"
          right={<TextInput.Affix />}
            value={saleRate}
            onChangeText={(text) => setSaleRate(text)}
            keyboardType="numeric"
          />
        </View>

        {/* Added Text Area for Comment */}
        <View style={styles.inputContainer}>
          <Text style={styles.textfields}>Narration</Text>
          <TextInput
            mode="outlined"
            label="Narration"
            right={<TextInput.Affix />}
            value={comment}
            onChangeText={handleCommentChange}
            multiline
          />
        </View>

        {/* Added Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>


        {/* Added Modal for Confirmation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirmationModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure?</Text>
              <View style={styles.modalButtonContainer}>

                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton, isLoading && styles.disabledButton]}
                  onPress={handleConfirmUpdate}
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Yes</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancelUpdate}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textfields: {
    marginLeft: 2,
    marginRight: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  pickerStyle: {
    flex: 1,
    color: '#000',
  },
  pickerItemStyle: {
    color: '#000',
  },
  deliveryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight:82,
    marginTop: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35,
    marginTop:5,
    marginBottom: 0,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginLeft: 25,
    marginRight: 120
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 55,
    marginBottom: 10,
  },
  textAreaStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    height: 60,
    marginLeft: 35,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 140,
    marginRight: 100,
  },
  button: {
    backgroundColor: '#4285f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15

  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#4285f4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',

  },
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  disabledButton: {
    opacity: 0.5,
  },
   alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'red', 
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

export default SelfStockTenderPurchase;
