export const addAddress = ( product) => {
    return {
        type: "ADDRESS",
        payload: product
    }
}

export const addBalance = ( product) => {
    return {
        type: "BALANCE",
        payload: product
    }

}

