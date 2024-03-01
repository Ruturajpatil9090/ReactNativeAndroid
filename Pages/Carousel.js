import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import logo1 from "../Assets/new.jpg"
import logo2 from "../Assets/new.jpg"
import logo from "../Assets/new.jpg"

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const flatlistRef = useRef();


  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        // If at the end of the carousel, reset to the first slide
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
        setActiveIndex(0);
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]); // Only re-run effect if activeIndex changes

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const carouselData = [
    {
      id: "01",
      image: logo,
    },
    {
      id: "02",
      image: logo1,
    },
    {
      id: "03",
      image: logo2,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={{ height: 220, width: screenWidth }} />
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);

    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: index === activeIndex ? "green" : "red",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      ></View>
    ));
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;
