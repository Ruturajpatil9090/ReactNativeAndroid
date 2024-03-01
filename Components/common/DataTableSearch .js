import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function DataTableSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
  };

  const inputStyle = {
    height: 60,
    fontSize: 14,
    width: 300, // Adjust width as needed
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  input: {
    height: 60,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default DataTableSearch;
