//Calculate total price of cart
export const calcTotal = (cart) => {
    let total = 0;
    cart.forEach(element => {
        let priceString = element.price;
        let price = Number(priceString.replace(/[^0-9.-]+/g,""));
        total += price * element.quantity;
    });

    return total;
}