import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, ScrollView, Dimensions } from "react-native";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "./loading";
import {
  productsDetailsFetch,
  productsDetailsFetchCleanup,
} from "../../store/actions/products/productDetails";
import { useDispatch, useSelector } from "react-redux";
/**
 * @function ProductDetails
 * @param {route} The route parameters
 * @returns all the details of a product as a component
 */
const ProductDetails = ({ route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fetchProductDetailReducer = useSelector((s) => s.productsDetailsFetch);

  useEffect(() => {
    dispatch(productsDetailsFetch({ id: route.params.paramKey }));
  }, []);
  useEffect(() => {
    if (fetchProductDetailReducer.isSuccessful) {
      setLoading(false);
      setData(fetchProductDetailReducer.data);
      dispatch(productsDetailsFetchCleanup());
    } else if (fetchProductDetailReducer.isLoading) {
      setLoading(true);
    } else if (fetchProductDetailReducer.isError) {
      setError(fetchProductDetailReducer.error);
      setLoading(false);
      dispatch(productsDetailsFetchCleanup());
    }
  }, [
    fetchProductDetailReducer.isSuccessful,
    fetchProductDetailReducer.isLoading,
    fetchProductDetailReducer.isError,
  ]);
  return (
    <View style={[{ backgroundColor: data.backgroundColor }, styles.container]}>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: data.backgroundColor, color: data.textColor }}>
            <View style={styles.header}>
              <MaterialCommunityIcons
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ color: data.textColor, marginRight: 10 }}
                name="arrow-left-thin"
                size={30}
              />
              <Text style={{ fontWeight: "bold", color: "white" }}>{data.title + "  "}</Text>
              <View style={{ alignSelf: "center" }}>
                <Text style={[{ color: data.accentColor }, styles.cartAmount]}>5</Text>
                <MaterialCommunityIcons
                  style={{ color: data.textColor, marginRight: 10 }}
                  name="cart"
                  size={30}
                />
              </View>
            </View>
            <View style={styles.product}>
              <Image
                source={{ uri: data.image1 }}
                style={{
                  height: 300,
                  width: "100%",
                  borderRadius: 10,
                  resizeMode: "stretch",
                }}
              />
              <View style={{ width: "100%", flex: 1, }}>
                <Text style={{ marginTop: 5, color: data.textColor, marginBottom: 3, marginLeft: 5, }}>
                  <Text style={{ fontWeight: "bold" }}>Name: {data.title + "  "}</Text>
                  {data.ukOnly && (
                    <Image
                      source={require("../../../assets/images/ukFlag.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  )}
                </Text>
                <Text style={{ marginTop: 5, color: data.textColor, marginBottom: 3, marginLeft: 5 }}>
                  <Text style={{ fontWeight: "bold", }}>BinomialName:</Text>{" "}
                  {data.binomialName}
                </Text>
                <Text
                  testID="product-price"
                  style={{ marginTop: 5, color: data.textColor, marginBottom: 3, marginLeft: 5 }}
                >
                  <Text style={{ fontWeight: "bold", }}>Price:</Text>{" "}
                  {data.price}
                </Text>
                <Text style={{ marginTop: 5, color: data.textColor, lineHeight: 25, marginBottom: 3, marginLeft: 5 }}>
                  <Text style={{ fontWeight: "bold", }}>Description:</Text>{" "}
                  {data.description}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFDFD",
    flex: 1,
  },
  header: {
    width: "100%",
    height: 90,
    display: "flex",
    color: "#000",
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  HeaderTitle: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#000",
    alignSelf: "center",
  },
  toggleBar: {
    display: "flex",
    alignSelf: "center",
  },

  product: {
    width: "95%",
    marginLeft: "2.5%",
    minHeight: Dimensions.get('window').height,
    paddingBottom: 15,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 28,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    alignSelf: "center",
    bottom: 10,
    right: 30,
    marginTop: 20,
  },
  minusBtn: {
    width: 60,
    height: 40,
    backgroundColor: "#fd7c72",
    borderRadius: 10,
    alignItems: "center",
  },
  addBtn: {
    width: 60,
    height: 40,
    backgroundColor: "#2fd7c6",
    borderRadius: 10,
    alignItems: "center",
  },
  cartAmount: {
    position: "absolute",
    right: 5,
    top: -10,
  },
  actionGroup: {
    width: "90%",
    height: "4em",
    display: "flex",
    justifyContent: "space-between",
  },
});
export default ProductDetails;
