import {CustomTable} from "./CustomTable";

export function ProductTable({products, setEditModal}) {

    return (
            <CustomTable
                head={[
                    "name",
                    "description",
                    "price",
                    "weight",
                    "category",
                    "id"
                ]}
                data={!Array.isArray(products) ? [] : products}
                setEditModal={setEditModal}
            />
    );
}
