import {CustomTable} from "./CustomTable";
import {Button} from "react-bootstrap";

export function ProductTable({products, selectedProducts, setSelectedProducts, setToast}) {

    return (
        <CustomTable
            head={[
                "name",
                "description",
                "price",
                "weight",
                "category",
            ]}
            data={!Array.isArray(products) ? [] : products.map(product => [
                product.name,
                product.description,
                product.price,
                product.weight,
                product.category,
                <Button style={{minWidth: 300}}
                        variant={"outline-dark"}
                        onClick={() => {
                            setToast({open: true, message: `${product.name} added to your order`})
                            setSelectedProducts([...selectedProducts, product])
                        }}
                >add to order</Button>
            ])}
        />
    );
}
