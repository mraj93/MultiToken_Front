// const address = ( state= null ,action) => {
// // const product = action.payload;
//     switch (action.type) {
//         case "ADDRESS":
//             return action.payload;
//         default:
//             return null;
//     }
// };
// export default address;

const address = (state = null, action) => {
    switch (action.type) {
        case "ADDRESS":
            return action.payload;
        default:
            return state;
    }
};

export default address;
