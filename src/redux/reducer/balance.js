// const balance = ( state= null ,action) => {
//     switch (action.type) {
//         case "BALANCE":
//             return action.payload;
//         default:
//             return null;
//     }
// };
// export default balance;

const balance = (state = null, action) => {
    switch (action.type) {
        case "BALANCE":
            return action.payload;
        default:
            return state;
    }
};

export default balance;





