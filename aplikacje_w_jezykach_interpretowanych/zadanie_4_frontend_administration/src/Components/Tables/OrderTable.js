import {CustomTable} from "./CustomTable";

export function OrderTable({orders, setEditModal}) {
    return (
            <CustomTable
                head={[
                    "username",
                    "mail",
                    "phone number",
                    "status",
                    "confirm date",
                    "products",
                    "id"
                ]}
                data={!Array.isArray(orders) ? [] : orders.map(order => {
                    return {
                        username: order.userName,
                        mail: order.mail,
                        phoneNumber: order.phoneNumber,
                        status: order.status,
                        confirmDate: order.confirmDate,
                        products: productsToString(order.products),
                        id: order.id,
                    }
                })}
                setEditModal={setEditModal}
            />
    );
}
export function productsToString(products) {
    let result = "";
    products.forEach(product => {
        result += `${product.name} x ${product.quantity}\n`;
    })
    return result;
}
