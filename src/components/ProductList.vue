<template>
  <div class="ml-72">
    <div class="flex w-1/2 justify-between items-center my-9">
      <h1 class="text-4xl underline font-serif">Product List</h1>
      <button @click="fetchProducts">
        <img class="w-10" src="../assets/Refresh%20Cw%20Alt%203%20Icon.svg" alt="">
      </button>
    </div>
    <div class="flex gap-5 items-start">
      <div class="w-1/2">
        <ul class="rounded-2xl border overflow-hidden bg-white">
          <li v-if="!loading" class="even:bg-gray-100 h-10 px-2.5 flex items-center justify-between"
              v-for="product in products" :key="product.id">
            {{ product.product_name }} - {{ product.product_amount }}
            <div>
              <button class="bg-red-600 hover:opacity-80 rounded text-white px-2 mr-2"
                      @click="removeProduct(product.id)">Delete
              </button>
              <button class="underline" @click="populateProduct(product)">Update</button>
            </div>
          </li>
          <li v-else class="text-center">Loading...</li>
        </ul>
        <button v-if="!loading && products.length > 0" @click="loadMore"
                class="w-full mt-4 bg-black text-white px-4 py-2 rounded-2xl">Load More
        </button>
      </div>

      <div class="bg-white border rounded-2xl py-3 px-6">
        <h2 class="mb-4 text-xl text-center">{{ editMode ? 'Edit Product' : 'Add Product' }}</h2>
        <form class="flex flex-col gap-3" @submit.prevent="editMode ? updateProduct() : addNewProduct()">
          <input class="pl-1 border rounded" v-model="newProductName" placeholder="Product Name"/>
          <input class="pl-1 border rounded" v-model.number="newProductAmount" type="number" placeholder="Amount"/>
          <button class="bg-black hover:opacity-80 items-center rounded text-white px-2" type="submit">
            {{ editMode ? 'Update' : '+' }}
          </button>
          <button class="underline" v-if="editMode" type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue';
import {useCrudStore} from '../stores/crudStore';

export default {
  setup() {
    const store = useCrudStore();

    const newProductName = ref('');
    const newProductAmount = ref(1);
    const editMode = ref(false);
    const selectedProductId = ref(null);

    const fetchProducts = () => store.fetchProducts();
    fetchProducts();

    const removeProduct = (id) => store.deleteProduct(id);

    const addNewProduct = () => {
      store.addProduct({
        product_name: newProductName.value,
        product_amount: newProductAmount.value,
      });
      clearForm();
    };

    const updateProduct = () => {
      store.updateProduct(selectedProductId.value, {
        product_name: newProductName.value,
        product_amount: newProductAmount.value,
      });
      clearForm();
    };

    const populateProduct = (product) => {
      newProductName.value = product.product_name;
      newProductAmount.value = product.product_amount;
      selectedProductId.value = product.id;
      editMode.value = true;
    };

    const cancelEdit = () => {
      clearForm();
    };

    const clearForm = () => {
      newProductName.value = '';
      newProductAmount.value = 1;
      selectedProductId.value = null;
      editMode.value = false;
    };

    const products = computed(() => store.products);
    const loading = computed(() => store.loading);

    return {
      fetchProducts,
      removeProduct,
      addNewProduct,
      updateProduct,
      populateProduct,
      cancelEdit,
      products,
      loading,
      newProductName,
      newProductAmount,
      editMode,
    };
  },
};

</script>
