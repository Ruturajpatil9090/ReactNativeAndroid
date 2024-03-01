import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {API_KEY} from "@env"


const MonthlyDetailDispatchComponent = ({ route }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { year, month } = route.params;

    fetch(`http://${API_KEY}/api/tender/monthlydetaildispatch?month=${month}&year=${year}`)
      .then((response) => response.json())
      .then((responseData) => {
        setMonthlyData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [route.params.data]);

  const renderMonthlyDetailCards = () => {
    return (
      <FlatList
        data={monthlyData}
        //keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Date: {item.Doc_DATE}</Text>
            <Text style={styles.text}>Ton: {item.tons}</Text>
            <Text style={styles.text}>day: {item.day_of_week}</Text>
          </View>
        )}
      />
    );
  };

  const renderLineChart = () => {
    const data = {
      labels: monthlyData.map((item) => new Date(item.Doc_DATE).getDate()),
      datasets: [
        {
          data: monthlyData.map((item) => item.tons),
        },
      ],
    };

    return (
      <LineChart
        data={data}
        width={400}
        height={200}
        
        chartConfig={{
          backgroundColor: '#f0f0f0',
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#f0f0f0',
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        
        }}
        bezier
        xLabels={monthlyData.map((item) => item.doc_date)}

        renderDotContent={({ x, y, index, value }) => (
          <Text
            key={index}
            style={{
              position: 'absolute',
              top: y - 20, 
              left: x - 20, 
              fontSize: 12,
              color: '#000',
            }}
          >
            {monthlyData[index].day_of_week}
          </Text>
        )}
       
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : monthlyData.length > 0 ? (
        <View>
          {renderLineChart()}
          {renderMonthlyDetailCards()}
        </View>
      ) : (
        <Text>No data available for the selected month and year.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    marginBottom: 0,
    padding: 10,
    marginTop:5,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E6BBB3',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#324ab2',
  },
});

export default MonthlyDetailDispatchComponent;
