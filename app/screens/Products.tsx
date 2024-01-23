import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { DetailsPageProps } from '../../App'
import { Product, useDB } from '../hooks/useDB';

const Products = ({ navigation, route }: DetailsPageProps) => {
  const { id } = route.params;
  const { getProductById, deleteProductById, updateProduct } = useDB();

  const [product, setProduct] = useState<Product | undefined>();

  const onUpdateProduct = async () => {
    await updateProduct(product);
    navigation.goBack();
  };

  const onDeleteProduct = async () => {
    await deleteProductById(id);
    navigation.goBack();
  };

  const onChangeText = (value: string, type: string) => {
    if (value === '') {
      setProduct(type === "quantity" ? { ...product, quantity: 1 } : { ...product, price: 1 });
    } else {
      setProduct(type === "quantity" ? { ...product, quantity: parseInt(value) } : { ...product, price: parseFloat(value) });
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      const result = await getProductById(id);
      setProduct(result)
    };
    loadProduct();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onDeleteProduct}>
          <Ionicons name="trash-outline" size={24} color="#000" />
        </TouchableOpacity>
      )
    })
  }, []);



  return (
    <View style={styles.container}>
      {product && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Name" value={product.name} onChangeText={(text) => setProduct({ ...product, name: text })} />
          <TextInput style={styles.input} placeholder="Description" value={product.description} onChangeText={(text) => setProduct({ ...product, description: text })} />
          <TextInput style={styles.input} placeholder="Price" value={product.price.toString()} onChangeText={(value) => onChangeText(value, 'price')} />
          <TextInput style={styles.input} placeholder="Image" value={product.image} onChangeText={(text) => setProduct({ ...product, image: text })} />
          <TextInput style={styles.input} placeholder="Category" value={product.category} onChangeText={(text) => setProduct({ ...product, category: text })} />
          <TextInput style={styles.input} placeholder="Quantity" value={product.quantity.toString()} onChangeText={(value) => onChangeText(value, 'quantity')}
          />
        </View>
      )}
      <Button title="Update Product" onPress={onUpdateProduct} />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    gap: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff'

  }
});

export default Products;