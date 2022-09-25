const configureStore = require("@reduxjs/toolkit").configureStore;

const registerReducer = require("../feature/register/registerSlice").default;

const store = configureStore({
    reducer: { register: registerReducer },
});

module.exports = store;
