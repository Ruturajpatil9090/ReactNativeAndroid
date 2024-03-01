import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function DataTablePagination({ totalItems, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <View style={styles.pageInfoContainer}>
          <Text style={styles.pageInfoText}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.pageButton, { opacity: currentPage === totalPages ? 0.5 : 1 }]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  pageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  pageInfoContainer: {
    paddingHorizontal: 10,
  },
  pageInfoText: {
    fontSize: 16,
  },
});

export default DataTablePagination;
