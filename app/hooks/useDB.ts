import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
}

export const useDB = () => {
  const db = SQLite.openDatabase("shop.db");

  useEffect(() => {
    initDB();
  }, []);

  const initDB = () => {
    const sql = `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL
    );`;

    db.execAsync([{ sql, args: [] }], false).then(() => {
      console.log("database initialized");
    });
  };

  const insertProduct = (product: Product) => {
    const { name, price, quantity, image, description, category } = product;
    const sql = `INSERT INTO products (name, price, quantity, image, description, category) VALUES (?,?,?,?,?,?)`;
    const args = [name, price, quantity, image, description, category];
    return db.execAsync([{ sql, args }], false);
  };

  const getProducts = async () => {
    const sql = `SELECT * FROM products`;
    const args = [];
    return db.execAsync([{ sql, args }], false).then((results) => {
      if ("rows" in results[0]) {
        return results[0].rows as Product[];
      }
    });
  };

  const getAllCategories = async () => {
    const sql = `SELECT DISTINCT category FROM products`;
    const args = [];
    return db.execAsync([{ sql, args }], false).then((results) => {
      if ("rows" in results[0]) {
        return results[0].rows as Product[];
      }
    });
  };

  const getProductsByCategory = async (category: string) => {
    const sql = `SELECT * FROM products WHERE category = ?`;
    const args = [category];
    return db.execAsync([{ sql, args }], false).then((results) => {
      if ("rows" in results[0]) {
        return results[0].rows as Product[];
      }
    });
  };

  const getProductById = async (id: string) => {
    const sql = `SELECT * FROM products WHERE id = ?`;
    const args = [id];
    return db.execAsync([{ sql, args }], false).then((results) => {
      if ("rows" in results[0]) {
        return results[0].rows[0] as Promise<Product>;
      }
    });
  };

  const updateProduct = (product: Product) => {
    const { id, name, price, quantity, image, description, category } = product;
    const sql = `UPDATE products SET name = ?, price = ?, description = ?, category = ?, image = ?, quantity = ? WHERE id = ?`;
    const args = [name, price, description, category, image, quantity, id];
    return db.execAsync([{ sql, args }], false);
  };

  const deleteProductById = async (id: string) => {
    const sql = `DELETE FROM products WHERE id = ?`;
    const args = [id];
    return db.execAsync([{ sql, args }], false).then((results) => {
      if ("rows" in results[0]) {
        return results[0].rows[0] as Promise<Product>;
      }
    });
  };

  return {
    getProducts,
    insertProduct,
    getAllCategories,
    getProductsByCategory,
    getProductById,
    deleteProductById,
    updateProduct,
  };
};
