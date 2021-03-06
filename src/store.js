import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menuItems: [
            {id: 1, name: 'apple', price: 3},
            {id: 2, name: 'pear', price: 2.7},
            {id: 3, name: 'grape', price: 5},
            {id: 4, name: 'pineapple', price: 4.5},
            {id: 5, name: 'carrot', price: 2.8},
            {id: 6, name: 'banana', price: 3.2}
        ],
        cartItems: [],
        purchasing: false,
        theme: {
            dark: false,
            mainColor: '#80CBC4',
            secondaryColor: '',
            cardColor: 'teal lighten-5'
        },
        Logining: false
    },
    getters: {
        getMenuItems(state) {
            return state.menuItems;
        },
        getCartItems(state) {
            return state.cartItems;
        },
        getTotalPrice(state) {
            const totalPrices = state.cartItems.map(item => item.price * item.quantity);
            if (totalPrices.length == 0) {
                return 0;
            } else {
                return totalPrices.reduce((a, b) => a + b).toFixed(2);
            }
        },
        isPurchasing(state) {
            return state.purchasing;
        },
        isLogining(state) {
            return state.Logining;
        }
    },
    mutations: {
        /* payload: {quantity: Number, item: cartItem} */
        updateCartItemQuantity(state, payload) {
            if (payload.item.quantity + payload.quantity <= 0) {
                payload.item.quantity = 0;
            } else {
                payload.item.quantity += payload.quantity;
            }
        },
        /* payload: {id: Number, name: String, price: Number, quantity: Number} */
        pushMenuItemIntoCartItems(state, payload) {
            state.cartItems.push({
                id: payload.id,
                name: payload.name,
                price: payload.price,
                quantity: payload.quantity
            });
        },
        /* payload: {item: cartItem} */
        removeCartItem(state, payload) {
            const cartItemIndex = state.cartItems.indexOf(payload.item);
            if (cartItemIndex > -1) {
                state.cartItems.splice(cartItemIndex, 1);
            }
        },
        toggleIsPurchasing(state) {
            state.purchasing = !state.purchasing;
        },
        toggleIsLogining(state) {
            state.Logining = !state.Logining;
        }
    }
});

export default store;
