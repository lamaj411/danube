import "./App.css";
import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
const GET_PRODUCTS_BY_CATEGORY = gql`
  query ($search: String!) {
    products(search: $search, pageSize: 20) {
      total_count
      items {
        name
        sku
        image {
          label
          url
        }
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
      }
      page_info {
        page_size
        current_page
      }
    }
  }
`;
function App() {
  const [selectedCategory, setSelectedCategory] = useState("Furniture");
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { search: selectedCategory },
  });

  console.log(data);
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      <div className="categoryContainer">
        {[
          "Furniture",
          "Sofas",
          "Corner Sofas",
          "Sofa Sets",
          "Three Seater Sofas",
        ].map((category, index) => {
          return (
            <div
              key={index}
              style={{
                padding: 20,
                color: category === selectedCategory ? "#fff" : "#000",
              }}
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
      {loading === false ? (
        <div className="productContainer">
          {data.products &&
            data.products.items.map((product, index) => {
              return (
                <div key={index} className="productItem">
                  <div>
                    <img
                      src={product.image.url}
                      alt={product.image.label}
                      className="productImg"
                    />
                  </div>
                  <div className="productName">{product.name}</div>
                  <div className="priceLabel">
                    {`${product.price.regularPrice.amount.value} ${product.price.regularPrice.amount.currency}`}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
