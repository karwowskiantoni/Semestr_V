import {Toast} from "react-bootstrap";

export function CustomToast({info, setInfo}) {
    return (
        <Toast bg={'success'}
               style={{ marginTop: '5vw', marginRight:'1vw', position: "relative", zIndex: 10000}}
               show={info.open}
               delay={5000}
               autohide={true}
               animation={false}
               onClose={() => setInfo({open: false, book: ""})}>
            <Toast.Header closeButton={false}>
                <strong className="me-auto">Dodano Książkę</strong>
            </Toast.Header>
            <Toast.Body>{`tytuł: ${info.book.title}, autor: ${info.book.title}`}</Toast.Body>
        </Toast>
    )
}