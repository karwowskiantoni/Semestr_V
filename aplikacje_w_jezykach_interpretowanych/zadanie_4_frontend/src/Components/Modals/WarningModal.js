import {Button, Modal} from "react-bootstrap";

export function WarningModal({info, setInfo}) {

    const switchVisibility = () => setInfo({open: !info.open, book: info.book});

    return (
        <Modal centered size={'lg'} show={info.open} onHide={switchVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Uwaga</Modal.Title>
            </Modal.Header>
            <Modal.Body>wprowadzona książka już istnieje, zmień dane tytuł/autora/datę wydania lub dodaj notatkę do istniejącej książki</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={switchVisibility}>
                    zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
}