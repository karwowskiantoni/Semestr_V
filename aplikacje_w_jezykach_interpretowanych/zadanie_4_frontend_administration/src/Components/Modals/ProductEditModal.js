import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "../AddPanels/TextInput";

export function ProductEditModal({URL, info, setInfo, setShouldReload, setWarningModal}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setName(info.product.name)
        setDescription(info.product.description)
        setPrice(info.product.price)
        setWeight(info.product.weight)
        setCategory(info.product.category)

        async function fetchAPI() {
            let response = await fetch(URL + "/categories");
            let json = await response.json();
            setCategories(json);
        }

        fetchAPI();
    }, [info])

    function updateProduct() {
        let body = {
            "name": name,
            "description": description,
            "price": price,
            "weight": weight,
            "category": category,
        }
        fetch(`${URL}/products/${info.product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(async response => {
            if (response.ok) {
                setShouldReload(Math.random())
                switchVisibility();
            } else {
                response = await response.text()
                setWarningModal({open: true, message: response})
            }
        })
    }

    const switchVisibility = () => setInfo({open: !info.open, product: info.product});

    return (
        <Modal centered size={"lg"} show={info.open} onHide={switchVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>edit Product:</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginLeft: "3.5vw"}}>
                <Form.Group as={Row}>
                    <TextInput title="name" value={name} setValue={setName}/>
                    <TextInput title="description" value={description} setValue={setDescription}/>
                </Form.Group>

                <Form.Group as={Row}>
                    <TextInput title="price" value={price} setValue={setPrice}/>
                    <TextInput title="weight" value={weight} setValue={setWeight}/>
                </Form.Group>
                <Form.Group
                    style={{minWidth: 306}}
                    as={Col} md="2" controlId={category}>
                    <Form.Label>category</Form.Label>
                    <Form.Control
                        onChange={text => setCategory(text.target.value)}
                        as="select"
                        className="mr-sm-2"
                        required
                    >
                        <option value="">{category}</option>
                        {categories.map(category => {
                            return <option key={category}>{category}</option>
                        })}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={updateProduct}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}