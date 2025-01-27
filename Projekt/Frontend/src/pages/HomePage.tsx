import React, { useEffect, useState } from "react";
import { Card, List, Spin, Rate, Button } from "antd";
import { fetchProducts } from "../api/index.tsx";
import { Product } from "../types/index.tsx";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`); // Przekieruj na stronę szczegółów produktu
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Button type="primary" onClick={() => navigate("/cart")}>
          Koszyk
        </Button>
        <Button onClick={() => navigate("/login")}>Logowanie</Button>
      </div>

      <h1>Nasze produkty</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <Card
                title={product.title}
                cover={<img alt={product.title} src={product.image} />}
                onClick={() => handleProductClick(product.id)}
              >
                <p>Cena: ${product.price}</p>
                <div>
                  <Rate disabled allowHalf defaultValue={product.rating.rate} />
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default HomePage;
