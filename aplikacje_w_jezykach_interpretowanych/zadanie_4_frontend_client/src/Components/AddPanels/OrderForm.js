import {Button, Card, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {TextInput} from "./TextInput";
import {groupBy} from "../Tables/OrderTable";


export function OrderForm({URL, setWarningModal, setToast, products, setSelectedProducts}) {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function sendOrder(body) {
        fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(async response => {
            if (response.ok) {
                setUsername("");
                setPhoneNumber("");
                setMail("");
                setSelectedProducts([]);
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
