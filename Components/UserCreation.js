// import React, { useState,useEffect } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { useNavigation,useRoute  } from '@react-navigation/native';

// const MyForm = () => {
//   const [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
//   const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
//   const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
//   const [editButtonEnabled, setEditButtonEnabled] = useState(false);
//   const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
//   const [backButtonEnabled, setBackButtonEnabled] = useState(true);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [employeeCodeNew, setEmployeeCodeNew] = useState("");
//   const navigation = useNavigation();
//   const route = useRoute();


//   const [formData, setFormData] = useState({
//     userName: "",
//     password: "",
//     employeeCode: "",
//     userName: "",
//     mobileNo: "",
//     emailId: "",
//     userType: "U",
//   });


//   const handleInputChange = (field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };


//   const handleSubmit = () => {
//     if (onSubmit) {
//       onSubmit(formData);
//       console.log("fromData", formData)
//     }
//   };


//   const handleAddOne = () => {
//     setAddOneButtonEnabled(false);
//     setSaveButtonEnabled(true);
//     setCancelButtonEnabled(true);
//     setEditButtonEnabled(false);
//     setDeleteButtonEnabled(false);
//     setIsEditMode(false);
//     setIsEditing(true);
//     axios
//       .get('http://103.132.2.156:75/api/employees/lastusercode')
//       .then((response) => {
//         const lastEmployeeCode = response.data.lastUserCreation;
//         console.log("lastEmployeeCode",)
//         setFormData({
//           employeeCode: String(lastEmployeeCode + 1),
//           userName: "",
//           mobileNo: "",
//           emailId: "",
//           password: "",
//           userType: "U",
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching last employee code:", error);
//       });
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setIsEditMode(true);
//     setAddOneButtonEnabled(false);
//     setSaveButtonEnabled(true);
//     setCancelButtonEnabled(true);
//     setEditButtonEnabled(false);
//     setDeleteButtonEnabled(false);
//     setBackButtonEnabled(true);
    
//   };

//   const handleSaveOrUpdate = () => {
//     if (isEditMode) {
//       axios
//         .put(
//           `http://103.132.2.156:75/api/employees/updateuser/${employeeCodeNew}`,
//           formData 
//         )
//         .then((response) => {
//           console.log("Data updated successfully:", response.data);
//           alert('Data update successfully!');
//           setIsEditMode(false);
//           setAddOneButtonEnabled(true);
//           setEditButtonEnabled(true);
//           setDeleteButtonEnabled(true);
//           setBackButtonEnabled(true);
//           setSaveButtonEnabled(false);
//           setCancelButtonEnabled(false);
//           setIsEditing(false);
//         })
//         .catch((error) => {
//           console.error("Error updating data:", error);
//         });
//     } else {
//       axios
//         .post(
//           'http://103.132.2.156:75/api/employees/insertnewuser',
//           formData
//         )
//         .then((response) => {
//           console.log('Data saved successfully:', response.data);
//           alert('Data saved successfully!');
//           setIsEditMode(false);
//           setAddOneButtonEnabled(true);
//           setEditButtonEnabled(true);
//           setDeleteButtonEnabled(true);
//           setBackButtonEnabled(true);
//           setSaveButtonEnabled(false);
//           setCancelButtonEnabled(false);
//           setIsEditing(true);

//           // Call handleSubmit after saving data
//           handleSubmit();
//           setFormData({
//             userName: '',
//             password: '',
//             employeeCode: '',
//             userName: '',
//             mobileNo: '',
//             emailId: '',
//             userType: 'U',
//           });
//         })
//         .catch((error) => {
//           console.error('Error saving data:', error);
//         });
//     }
//   };

//   const handleBack = () => {
//     navigation.navigate('Userutility');
//   };

//   const handleDelete = () => {
//     setIsEditMode(false);
//     setAddOneButtonEnabled(true);
//     setEditButtonEnabled(true);
//     setDeleteButtonEnabled(true);
//     setBackButtonEnabled(true);
//     setSaveButtonEnabled(false);
//     setCancelButtonEnabled(false);
//     axios
//     .delete(
//       `http://103.132.2.156:75/api/employees/deleteuser/${employeeCodeNew}`
//     )
//     .then((response) => {
     
//       console.log("User deleted successfully:", response.data);
//       alert(`User deleted successfully:${employeeCodeNew}`)
//       // Reset the form after successful deletion
//       setFormData({
//         employeeCode: "",
//         userName: "",
//         mobileNo: "",
//         emailId: "",
//         password: "",
//         userType: "U",
//       });
//     })
//     .catch((error) => {
//       console.error("Error during API call:", error);
//     });
//   };

//   const handleCancel = () => {
//     setIsEditMode(false);
//     setAddOneButtonEnabled(true);
//     setEditButtonEnabled(true);
//     setDeleteButtonEnabled(true);
//     setBackButtonEnabled(true);
//     setSaveButtonEnabled(false);
//     setCancelButtonEnabled(false);
//     setIsEditing(false);
  
//     // Use Axios to make a GET request to fetch the last record
//     axios
//       .get('http://103.132.2.156:75/api/employees/getlastrecordbyuserid')
//       .then((response) => {
//         // Assuming the response contains the last record data
//         const lastRecord = response.data.lastUserCreation;
//         const latestEmployeeCode = String(lastRecord.employeeCode);
  
//         // Set the values from the last record to the state
//         setFormData({
//           employeeCode: latestEmployeeCode,
//           userName: lastRecord.userName,
//           mobileNo: String(lastRecord.mobileNo),
//           emailId: lastRecord.emailId,
//           password: lastRecord.password,
//           userType: lastRecord.userType,
//         });
  
//         // Update the employeeCodeNew state variable
//         setEmployeeCodeNew(latestEmployeeCode);
//       })
//       .catch((error) => {
//         console.error("Error fetching last record:", error);
//       });
//   };

//   useEffect(() => {
    
//     const editRecordData = route.params && route.params.editRecordData;
//     console.log("editRecordData",editRecordData)

//     if (editRecordData) {
//       setFormData({
//         userName: editRecordData.userName || "",
//         password: editRecordData.password || "",
//         employeeCode: String(editRecordData.employeeCode) || "",
//         mobileNo: String(editRecordData.mobileNo) || "",
//         emailId: editRecordData.emailId || "",
//         userType: editRecordData.userType || "U",
//       });

//       setAddOneButtonEnabled(true);
//       setEditButtonEnabled(true);
//       setDeleteButtonEnabled(true);
//       setBackButtonEnabled(true);
//       setSaveButtonEnabled(false);
//       setCancelButtonEnabled(false);
//       setIsEditing(true);
      
//     } else {
//       handleAddOne();
//     }
//   }, [route.params]);



//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.formHeader}>
//           New User Creation
//         </Text>
//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
//           <TouchableOpacity
//             onPress={handleAddOne}
//             disabled={!addOneButtonEnabled}
//             style={{
//               backgroundColor: addOneButtonEnabled ? 'blue' : 'white',
//               borderColor: '#ccc',
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 10,
//               margin: 5,
//             }}
//           >
//             <Text style={{ color: addOneButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Add</Text>
//           </TouchableOpacity>
//           {isEditMode ? (
//             <TouchableOpacity
//               onPress={handleSaveOrUpdate}
//               style={{
//                 backgroundColor: 'blue',
//                 borderColor: '#ccc',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 8,
//                 margin: 5,
//               }}
//             >
//               <Text style={{ color: 'white', fontSize: 10 }}>Update</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               onPress={handleSaveOrUpdate}
//               disabled={!saveButtonEnabled}
//               style={{
//                 backgroundColor: saveButtonEnabled ? 'blue' : 'white',
//                 borderColor: '#ccc',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 8,
//                 margin: 5,
//               }}
//             >
//               <Text style={{ color: saveButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Save</Text>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             onPress={handleEdit}
//             disabled={!editButtonEnabled}
//             style={{
//               backgroundColor: editButtonEnabled ? 'blue' : 'white',
//               borderColor: '#ccc',
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 8,
//               margin: 5,
//             }}
//           >
//             <Text style={{ color: editButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleDelete}
//             disabled={!deleteButtonEnabled}
//             style={{
//               backgroundColor: deleteButtonEnabled ? 'blue' : 'white',
//               borderColor: '#ccc',
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 8,
//               margin: 5,
//             }}
//           >
//             <Text style={{ color: deleteButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Delete</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleCancel}
//             disabled={!cancelButtonEnabled}
//             style={{
//               backgroundColor: cancelButtonEnabled ? 'blue' : 'white',
//               borderColor: '#ccc',
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 8,
//               margin: 5,
//             }}
//           >
//             <Text style={{ color: cancelButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleBack}
//             disabled={!backButtonEnabled}
//             style={{
//               backgroundColor: backButtonEnabled ? 'blue' : 'white',
//               borderColor: '#ccc',
//               borderWidth: 1,
//               borderRadius: 5,
//               padding: 8,
//               margin: 5,
//             }}
//           >
//             <Text style={{ color: backButtonEnabled ? 'white' : 'black', fontSize: 10 }}>Back</Text>
//           </TouchableOpacity>
//         </View>
//       </View>



//       <View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Employee Code:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.employeeCode}
//             onChangeText={(text) => handleInputChange('employeeCode', text)}
//             editable={false} 
            
//           />

//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>User Name:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.userName}
//             onChangeText={(text) => handleInputChange('userName', text)}
//             editable={isEditing}

//           />
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Mobile No:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.mobileNo}
//             onChangeText={(text) => handleInputChange('mobileNo', text)}
//             keyboardType="phone-pad"
//             editable={isEditing}
//           />
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Email Id:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.emailId}
//             onChangeText={(text) => handleInputChange('emailId', text)}
//             keyboardType="email-address"
//             editable={isEditing}
//           />
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Password:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.password}
//             onChangeText={(text) => handleInputChange('password', text)}
//             secureTextEntry
//             editable={isEditing}
//           />
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>User Type:</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.userType}
//             onChangeText={(text) => handleInputChange('userType', text)}
//             editable={isEditing}
//           />
//         </View>

//       </View>



//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   formHeader: {
//     marginTop: 20,
//     marginBottom: 10,
//     textAlign: 'center',
//     fontSize: 18,
//   },
//   label: {

//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     width: '50%',
//     borderColor: 'red',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },

//   submitButton: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });



// export default MyForm;
