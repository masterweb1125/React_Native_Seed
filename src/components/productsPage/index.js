import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StatusBar,
  Styleheet,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch, productsFetchCleanup } from "../../store/actions/products";
import AxiosCall from "../../utils/axiosCall";
import Loading from "./loading";
import ImageCarousel from "./productCarousel";

const ProductsPage = () => {
  const fetchProductsReducer = useSelector((s) => s.productsFetch);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  useEffect(()=>{
    dispatch(productsFetch())
  },[])
  useEffect(()=>{
    if (fetchProductsReducer.isSuccessful){
      setLoading(false)
      setData(fetchProductsReducer.data)
      dispatch(productsFetchCleanup())
    }else if(fetchProductsReducer.isLoading){
      setLoading(true)
    }else if (fetchProductsReducer.isError){
      setError(fetchProductsReducer.error)
      setLoading(false)
      dispatch(productsFetchCleanup())
    }
  },[fetchProductsReducer.isSuccessful,fetchProductsReducer.isLoading,fetchProductsReducer.isError])
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          <Loading />
        ) : isEnabled ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "96%",
                marginLeft: "2%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Toggle view: </Text>
              <View>
                <Switch
                  tintColor="transparent"
                  thumbTintColor={isEnabled ? "#51c39d" : "#cccccc"}
                  onTintColor="transparent"
                  value={isEnabled}
                  style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                  onValueChange={toggleSwitch}
                />
              </View>
            </View>
            <ImageCarousel
              data={data.slice().sort((a, b) => a.order - b.order)}
            />
          </>
        ) : (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "96%",
                marginLeft: "2%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Toggle view: </Text>
              <View>
                <Switch
                  tintColor="transparent"
                  thumbTintColor={isEnabled ? "#51c39d" : "#cccccc"}
                  onTintColor="transparent"
                  value={isEnabled}
                  style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                  onValueChange={toggleSwitch}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }}>
                <View style={style.bigWrap}>
                  {data
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((item, key) => {
                      return (
                        <TouchableHighlight
                          key={item.id}
                          style={style.wrap}
                          onPress={() =>
                            navigation.navigate("ProductDetails", {
                              paramKey: item.id,
                            })
                          }
                        >
                          <View style={[{backgroundColor: item.backgroundColor},style.product]}>
                            <Image
                              source={{ uri: item.image1 }}
                              style={{
                                height: 200,
                                width: "100%",
                                borderRadius: 10,
                                resizeMode: "stretch",
                              }}
                            />
                            <View style={{flexDirection:"row", padding:5, justifyContent:"space-between", alignItems:"center", }}>
                              <Text
                                style={{
                                  marginTop: 5,
                                  marginBottom: 3,
                                  marginLeft: 5,
                                  color: item.textColor
                                }}
                              >
                                {item.title}
                              </Text>
                              {item.ukOnly && (
                                <Image
                                  source={require("../../../assets/images/ukFlag.png")}
                                  style={{ height: 20, width: 20, borderRadius:2 }}
                                />
                              )}
                            </View>
                            <Text
                              style={{
                                backgroundColor: item.accentColor,
                                paddingTop: 5,
                                color: item.textColor,
                                width: "100%",
                                textAlign: "center",
                                borderRadius: 10,
                                position: "absolute",
                                bottom: 0,
                                height: 35,
                              }}
                            >
                              $ {item.price}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      );
                    })}
                </View>
                <View style={style.moreBtn}>
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    more
                  </Text>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  bigWrap: {
    width: "96%",
    display: "flex",
    flexDirection: "row",
    marginLeft: "2%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  wrap: {
    width: "48%",
    backgroundColor: "transparent",
    height: 300,
    marginTop: 15,
  },
  product: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  moreBtn: {
    width: 70,
    height: 30,
    textAlign: "center",
    color: "#fff",
    borderRadius: 5,
    marginLeft: "42%",
    backgroundColor: "#fd7c72",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ProductsPage;
