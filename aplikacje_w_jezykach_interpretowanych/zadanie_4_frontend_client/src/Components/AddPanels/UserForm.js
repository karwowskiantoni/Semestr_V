import {Button, Card, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "./TextInput";


export function UserForm({URL, setShouldReload, setWarningModal, setToast}) {

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
    }, [name])

    function sendNewProduct(body) {

        fetch(`${URL}/products`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(async response => {
            if (response.ok) {
                setShouldReload(Math.random())
                setName("");
                setCategory("");
                setPrice("");
                setWeight("");
                setDescription("");
                setToast({open: true, message: "product added"})
            } else {
                response = await response.text()
                setWarningModal({open: true, message: response})
            }
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidated(false);
            let body = {
                "name": name,
                "description": description,
                "price": price,
                "weight": weight,
                "category": category,
            }
            sendNewProduct(body)
        } else {
            setValidated(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Card className={"mt-3 mb-3"} style={{padding: 30}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <TextInput title="name" placeholder="e.g. desk" value={name} setValue={setName}/>
                    <TextInput title="description" placeholder="e.g. simple oak desk" value={description}
                               setValue={setDescription}/>
                    <TextInput title="price" placeholder="e.g. 10" value={price} setValue={setPrice}/>
                    <TextInput title="weight" placeholder="e.g. 20" value={weight}
                               setValue={setWeight}/>
                    <TextInput title="category" placeholder="e.g. furniture" value={category}
                               setValue={setCategory}/>
                </Form.Group>
                <Button className={"mt-4"} type="submit">add product</Button>
            </Form>
        </Card>
    );
}

// <Form.Group as={Col} md="2" controlId="unit">
//     <Form.Label>kategoria</Form.Label>
//     <Form.Control
//         onChange={text => setCategory(text.target.value)}
//         as="select"
//         className="mr-sm-2"
//         custom
//         required
//     >
//         <option value="">wybierz...</option>
//         <option value="gramy">gramy</option>
//         <option value="sztuki">sztuki</option>
//     </Form.Control>
//     <Form.Control.Feedback type="invalid">
//         pole wymagane
//     </Form.Control.Feedback>
// </Form.Group>
