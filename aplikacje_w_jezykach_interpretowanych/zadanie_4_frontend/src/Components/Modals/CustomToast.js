import {Toast} from "react-bootstrap";

export function CustomToast({info, setInfo}) {
    return (
        <Toast bg={'light'}
               style={{ marginTop: '5vw', marginRight:'1vw', position: "relative", zIndex: 10000}}
               show={info.open}
               delay={5000}
               autohide={true}
               animation={false}
               onClose={() => setInfo({open: false, message: ""})}>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">info</strong>
            </Toast.Header>
            <Toast.Body>{info.message}</Toast.Body>
        </Toast>
    )
}