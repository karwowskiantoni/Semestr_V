import { CustomTable } from "./CustomTable";
import { Button, Form, Row } from "react-bootstrap";

export function OrderTable({ products, setProducts }) {
  return (
    <CustomTable
      head={["name", "description", "price", "weight", "category"]}
      data={
        !Array.isArray(products)
          ? []
          : groupBy(products, (product) => product.id).map((product) => [
              product[0].name,
              product[0].description,
              product[0].price,
              product[0].weight,
              product[0].category,
              <Form>
                <Row style={{ marginLeft: 10 }}>
                  <Button
                    onClick={() => removeById(product[0].id)}
                    style={{ maxWidth: 35 }}
                  >
                    {"-"}
                  </Button>
                  <Form.Control
                    readOnly={true}
                    style={{ maxWidth: 40 }}
                    value={product.length}
                  />
                  <Button
                    onClick={() => addById(product[0].id)}
                    style={{ maxWidth: 35 }}
                  >
                    {"+"}
                  </Button>
                </Row>
              </Form>,
            ])
      }
      bottom={[
        "sum: ",
        "",
        products.length === 0 ? "" : sumPrice(products),
        products.length === 0 ? "" : sumWeight(products),
        "",
      ]}
    />
  );

  function sumPrice(products) {
    let sum = 0;
    for (const product of products) {
      sum += parseFloat(product.price);
    }
    return sum.toFixed(2);
  }

  function sumWeight(products) {
    let sum = 0;
    for (const product of products) {
      sum += parseFloat(product.weight);
    }
    return sum.toFixed(2);
  }

  function removeById(id) {
    setProducts(firstWithGivenId(products, id).slice(1));
  }

  function addById(id) {
    setProducts([...products, firstWithGivenId(products, id)[0]]);
  }

  function firstWithGivenId(products, id) {
    return products.sort((o1, o2) => (o1.id === id ? -1 : 1));
  }
}

export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map.values());
}
