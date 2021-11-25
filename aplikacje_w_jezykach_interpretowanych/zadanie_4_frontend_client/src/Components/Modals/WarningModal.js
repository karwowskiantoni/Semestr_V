import {Button, Modal} from "react-bootstrap";

export function WarningModal({info, setInfo}) {

    const switchVisibility = () => setInfo({open: !info.open, message: info.message});

    return (
        <Modal centered size={'lg'} show={info.open} onHide={switchVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>{info.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={switchVisibility}>
                    close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}