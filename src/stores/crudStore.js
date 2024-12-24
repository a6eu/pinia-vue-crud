import { defineStore } from 'pinia';
import axios from 'axios';

export const useCrudStore = defineStore('crud', {
    state: () => ({
        products: [],
        loading: false,
    }),

    actions: {
        async fetchProducts() {
            this.loading = true;
            try {
                const response = await axios.get('http://dev.mindwave.kz/api/sandbox/crud');
                this.products = [...this.products, ...response.data.content.rows];
                console.log(response.data.content.rows);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        },

        async addProduct(product) {
            try {
                const response = await axios.post('http://dev.mindwave.kz/api/sandbox/crud', product);
                this.products.push(response.data.content.rows);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        },

        async updateProduct(id, updatedProduct) {
            try {
                await axios.put(`http://dev.mindwave.kz/api/sandbox/crud/${id}`, updatedProduct);
                const index = this.products.findIndex((p) => p.id === id);
                if (index !== -1) {
                    this.products[index] = { ...this.products[index], ...updatedProduct };
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },

        async deleteProduct(id) {
            try {
                await axios.delete(`http://dev.mindwave.kz/api/sandbox/crud/${id}`);
                this.products = this.products.filter((p) => p.id !== id);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
    },
});
