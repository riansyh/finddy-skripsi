const configureStore = require("@reduxjs/toolkit").configureStore;

const registerReducer = require("../feature/register/registerSlice").default;
const authUserReducer = require("../feature/authUser/authUserSlice").default;

const store = configureStore({
    reducer: { register: registerReducer, authUser: authUserReducer },
});

module.exports = store;
