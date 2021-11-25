import {CustomTable} from "./CustomTable";

export function OrderTable({orders, setEditModal}) {

    return (
            <CustomTable
                head={[
                    "username",
                    "mail",
                    "phone number",
                    "status",
                    "products",
                    "id"
                ]}
                data={!Array.isArray(orders) ? [] : orders}
                setEditModal={setEditModal}
            />
    );
}
