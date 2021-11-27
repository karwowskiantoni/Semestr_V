import {Button, Card, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "./TextInput";
import {groupBy} from "../Tables/OrderTable";


export function OrderForm({URL, setShouldReload, setWarningModal, setToast, products}) {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
    }, [username])

    function sendOrder(body) {
        console.log(body)
        fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(async response => {
            if (response.ok) {
                setShouldReload(Math.random())
                setUsername("");
                setPhoneNumber("");
                setMail("");
                setToast({open: true, message: "order confirmed"})
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
                "userName": username,
                "mail": mail,
                "phone": phoneNumber,
                "products": groupBy(products, product => product.id).map(productGroup => {
                    return {productId: productGroup[0].id, quantity: parseInt(productGroup.length)}
                })
            }
            sendOrder(body)
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
                    <TextInput title="username" placeholder="e.g. jkowalski" value={username} setValue={setUsername}/>
                    <TextInput title="mail" placeholder="e.g. jan.kowalski@gmail.com" value={mail}
                               setValue={setMail}/>
                    <TextInput title="phone number" placeholder="e.g. 532 353 235" value={phoneNumber}
                               setValue={setPhoneNumber}/>
                </Form.Group>
                <Button className={"mt-4"} type="submit">order products</Button>
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
