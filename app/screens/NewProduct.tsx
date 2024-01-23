import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { ModalPageProps } from '../../App'
import { Product, useDB } from '../hooks/useDB';

const NewProduct = ({ navigation }: ModalPageProps) => {
    const { insertProduct } = useDB();

    const [product, setProduct] = useState<Product>({
        name: 'hat',
        description: '',
        price: 42,
        image: '',
        category: 'clohting',
        quantity: 0
    });

    const addProduct = async () => {
        const insertedProduct = await insertProduct(product);
        console.log(insertedProduct);
        navigation.goBack();
        return insertProduct;
    };


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" value={product.name} onChangeText={(text) => setProduct({ ...product, name: text })} />
                <TextInput style={styles.input} placeholder="Description" value={product.description} onChangeText={(text) => setProduct({ ...product, description: text })} />
                <TextInput style={styles.input} placeholder="Price" onChangeText={(value) => setProduct({ ...product, price: parseFloat(value) })} />
                <TextInput style={styles.input} placeholder="Image" value={product.image} onChangeText={(text) => setProduct({ ...product, image: text })} />
                <TextInput style={styles.input} placeholder="Category" value={product.category} onChangeText={(text) => setProduct({ ...product, category: text })} />
                <TextInput style={styles.input} placeholder="Quantity" onChangeText={(value) => setProduct({ ...product, quantity: parseInt(value) })} />
            </View>
            <Button title="Create Product" onPress={addProduct} />
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

export default NewProduct