import React from "react";
import { data } from "../src/components/productsPage/testData";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ImageCarousel from "../src/components/productsPage/productCarousel";
import { NavigationContainer } from "@react-navigation/native";

describe(ImageCarousel, () => {
  it("renders with error", async () => {
    render(
      <NavigationContainer>
        <ImageCarousel data={data} />
      </NavigationContainer>
    );
    const allProducts = await screen.findAllByTestId("carousel-list");

    expect(allProducts.length).toBe(1);
  });
});

describe(ImageCarousel, () => {
  it("check if all products are rendered without error", async () => {
    render(
      <NavigationContainer>
        <ImageCarousel data={data} />
      </NavigationContainer>
    );
    const renderedItems = await screen.findAllByTestId("product-id");
    expect(renderedItems.length).toBe(7);
  });
});
