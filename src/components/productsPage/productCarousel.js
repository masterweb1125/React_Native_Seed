import { useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const SPACING = 5;
const ITEM_LENGTH = width * 0.9; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;

/**
 * @function carousel
 * @param {data} the product data to display in the carousel
 * @returns the carousel component
 */
const ImageCarousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState([]);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const currentIndex = useRef(0);
  const navigation = useNavigation();
  useEffect(() => {
    setDataWithPlaceholders([{ id: -1 }, ...data, { id: data.length }]);
  }, [data]);
  const flatListRef = useRef(null); // this references the flatlist tag.

  const handleOnViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      const itemsInView = viewableItems.filter(
        ({ item }) => item.image1 && item.title
      );

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = itemsInView[0].index;
    },
    [data]
  );
  /**
   * @function handleOnPrev
   * @returns the previous product on the carousel
   */
  const handleOnPrev = () => {
    if (currentIndex.current === 1) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current - 1,
      });
    }
  };
  /**
   * @function handleOnNext
   * @returns a function to next the carousel
   */
  const handleOnNext = () => {
    if (currentIndex.current === data.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current + 1,
      });
    }
  };
  const getItemLayout = () => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        testID="carousel-list"
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
        data={dataWithPlaceholders}
        renderItem={({ item, index }) => {
          if (!item.image1 || !item.title) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [
              CURRENT_ITEM_TRANSLATE_Y * 2,
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y * 2,
            ],
            extrapolate: "clamp",
          });

          return (
            <View testID="product-id" style={{ width: ITEM_LENGTH }}>
              <Animated.View
                style={[
                  {
                    transform: [{ translateY }],
                  },
                  styles.itemContent,
                ]}
              >
                <Image source={{ uri: item.image1 }} style={styles.itemImage} />
                <View
                  style={[
                    {
                      backgroundColor: item.backgroundColor,
                      borderRadius: 10,
                    },
                    styles.contentDescription,
                  ]}
                >
                  <Text
                    style={[{ color: item.textColor }, styles.itemTexOfLines]}
                  >
                    {item.title}
                  </Text>
                  {item.ukOnly && (
                    <Image
                      source={require("../../../assets/images/ukFlag.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  )}
                </View>
              </Animated.View>
              <Text
                
                style={{
                  backgroundColor: item.accentColor,
                  paddingTop: 5,
                  color: item.textColor,
                  width: "80%",
                  textAlign: "center",
                  position: "absolute",
                  top: 70,
                  right: 20,
                  borderRadius: 10,
                  width: 70,
                  height: 35,
                }}
              >
                $ {item.price}
              </Text>
            </View>
          );
        }}
        // getItemLayout={()=>getItemLayout(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={handleOnPrev}
          disabled={isPrevDisabled}
          style={({ pressed }) => [
            {
              opacity: pressed || isPrevDisabled ? 0.5 : 1.0,
            },
            styles.arrowBtn,
          ]}
        >
          <Text
            style={styles.arrowBtnText}
            accessibilityLabel="Go To Previous Item"
          >
            ◂
          </Text>
        </Pressable>
        <Text>{"   "}</Text>
        <Pressable
          onPress={handleOnNext}
          disabled={isNextDisabled}
          style={({ pressed }) => [
            {
              opacity: pressed || isNextDisabled ? 0.5 : 1.0,
            },
            styles.arrowBtn,
          ]}
        >
          <Text
            style={styles.arrowBtnText}
            accessibilityLabel="Go To Next Item"
          >
            ▸
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    height: 500,
    alignItems: "flex-start",
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  itemContent: {
    marginHorizontal: SPACING * 2,
    alignItems: "flex-start",
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: "absolute",
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: "white",
    fontWeight: "600",
  },
  contentDescription: {
    position: "absolute",
    bottom: 0,
    height: 60,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemImage: {
    width: "100%",
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: "cover",
  },

  arrowBtn: {},
  arrowBtnText: {
    fontSize: 42,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    height: 40,
  },
});
