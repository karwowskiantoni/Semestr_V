import {Col, Form} from "react-bootstrap";

export function TextInput({title, placeholder, value, setValue}) {
    return (
        <Form.Group
            style={{minWidth: 250}}
            as={Col} md="2" controlId={title}>
            <Form.Label>{title}</Form.Label>
            <Form.Control
                onChange={text => setValue(text.target.value)}
                required
                value={value}
                type="text"
                placeholder={placeholder}
            />
            <Form.Control.Feedback type="invalid">
                pole wymagane
            </Form.Control.Feedback>
        </Form.Group>
    );
}
