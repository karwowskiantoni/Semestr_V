import {Button, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "../AddPanels/TextInput";

export function EditModal({URL, info, setInfo, setShouldReload, setWarningModal}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        setName(info.product.name)
        setDescription(info.product.description)
        setPrice(info.product.price)
        setWeight(info.product.weight)
        setCategory(info.product.category)
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
                <Form.Group as={Row}>
                    <TextInput title="category" value={category} setValue={setCategory}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={updateProduct}>
                    Zapisz zmiany
                </Button>
            </Modal.Footer>
        </Modal>
    );
}