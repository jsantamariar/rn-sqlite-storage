import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProductsPageProps } from '../../App';
import { Product, useDB } from '../hooks/useDB';
import { numberFormat } from '../utils';

const Home = ({ navigation }: ProductsPageProps) => {
    const { getProducts, getAllCategories, getProductsByCategory } = useDB();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
            loadAllCategories();
        }, [])
    );

    const loadAllCategories = async () => {
        const result = await getAllCategories();
        setCategories([{ label: "All", value: null }, ...result.map((item) => ({ label: item.category, value: item.category }))]);
    };

    const loadProducts = async () => {
        const result = await getProducts();
        setProducts(result);
    };

    const filterProducts = async (category: { label: string, value: string }) => {
        if (!category.value) {
            loadProducts();
        } else {
            const result = await getProductsByCategory(category.value)
            setProducts(result);
        }
    };

    const RenderProduct = ({ item }: { item: Product }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id.toString() })}>
                <View style={styles.item}>
                    <Image source={{ uri: item.image ? item.image : 'https://placehold.co/50@2x.png' }} style={{ width: 40, height: 40 }} />
                    <Text style={{ flex: 1 }}>{item.name}</Text>
                    <Text>{numberFormat(item.price)} x {item.quantity}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                searchable
                onSelectItem={filterProducts}
                open={open}
                value={selectedCategory}
                items={categories}
                setOpen={setOpen}
                setValue={setSelectedCategory}
                setItems={setCategories}
            />
            <FlatList data={products} keyExtractor={item => item.id.toString()} renderItem={RenderProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingVertical: 20,
        flex: 1
    },
    item: {
        backgroundColor: '#fff',
        padding: 8,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
});

export default Home;
