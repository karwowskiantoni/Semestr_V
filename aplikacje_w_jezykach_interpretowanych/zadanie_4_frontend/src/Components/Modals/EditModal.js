import {Button, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "../AddPanels/TextInput";

export function EditModal({URL, info, setInfo, setShouldReload}) {

    const [author, setAuthor] = useState(info.book.author);
    const [title, setTitle] = useState(info.book.title);
    const [category, setCategory] = useState(info.book.category);
    const [publicationDate, setPublicationDate] = useState(info.book.publicationDate);
    const [description, setDescription] = useState(info.book.description);
    const [location, setLocation] = useState(info.book.location);

    useEffect(() => {
        setAuthor(info.book.author)
        setTitle(info.book.title)
        setCategory(info.book.category)
        setPublicationDate(info.book.publicationDate)
        setDescription(info.book.description)
        setLocation(info.book.location)
    }, [info])

    function updateBook() {
        let body = {
            "author": author,
            "title": title,
            "category": category,
            "publicationDate": publicationDate,
            "description": description,
            "location": location,
        }
        fetch(`${URL}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info.book)
        }).then(response => {
            fetch(`${URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }).then(response => {
                setShouldReload(Math.random())
                switchVisibility();
            })
        })
    }

    function deleteBook() {
        fetch(`${URL}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info.book)
        }).then(response => {
            setShouldReload(Math.random())
            switchVisibility();
        })
    }

    const switchVisibility = () => setInfo({open: !info.open, book: info.book});

    return (
        <Modal centered size={"lg"} show={info.open} onHide={switchVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Edytuj Książkę:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row}>
                    <TextInput title="Autor" value={author} setValue={setAuthor}/>
                    <TextInput title="Tytuł" value={title} setValue={setTitle}/>
                    <TextInput title="Kategoria" value={category} setValue={setCategory}/>
                </Form.Group>

                <Form.Group as={Row}>
                    <TextInput title="Data Wydania"  value={publicationDate}
                               setValue={setPublicationDate}/>
                    <TextInput title="Notatki" value={description}
                               setValue={setDescription}/>
                    <TextInput title="Lokalizacja" value={location}
                               setValue={setLocation}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteBook}>
                    Usuń
                </Button>
                <Button variant="success" onClick={updateBook}>
                    Zapisz zmiany
                </Button>
            </Modal.Footer>
        </Modal>
    );
}