import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export function OrderEditModal({URL, info, setInfo, setShouldReload, setWarningModal}) {

    const [status, setStatus] = useState("");
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        setStatus(info.order.status)
        async function fetchAPI() {
            let response = await fetch(URL + "/statuses");
            let json = await response.json();
            setStatuses(json);
        }

        fetchAPI();
    }, [info])

    function updateOrder() {
        let body = {
            "status": status,
            "id": info.order.id,
        }
        fetch(`${URL}/orders/${info.order.id}`, {
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

    const switchVisibility = () => setInfo({open: !info.open, order: info.order});

    return (
        <Modal centered size={"lg"} show={info.open} onHide={switchVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>edit order status:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>status</Form.Label>
                <Form.Control
                    onChange={text => setStatus(text.target.value)}
                    as="select"
                    className="mr-sm-2"
                    required
                >
                    <option value="">{status}</option>
                    {statuses.map(status => {return <option key={status}>{status}</option>})}
                </Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={updateOrder}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}