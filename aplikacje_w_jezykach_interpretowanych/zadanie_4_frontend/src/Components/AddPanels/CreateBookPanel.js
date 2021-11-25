import {Button, Card, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TextInput} from "./TextInput";


export function CreateBookPanel({URL, editMode, setShouldReload, setWarningModal, setToast, books}) {

    const [validated, setValidated] = useState(false);
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
    }, [author])

    function sendNewBook(body) {

        fetch(`${URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response => {
            setShouldReload(Math.random())
            setAuthor("");
            setTitle("");
            setCategory("");
            setPublicationDate("");
            setDescription("");
            setLocation("");
            setToast({open: true, book: body})
        })
    }

    function isAlreadyInBooks(newBook) {
        let result = false;
        for(const book of books) {
            // console.log(JSON.stringify(book));
            if (book.title.toLowerCase().includes(newBook.title.toLowerCase()) &&
                book.author.toLowerCase().includes(newBook.author.toLowerCase()) &&
                book.publicationDate.toLowerCase().includes(newBook.publicationDate.toLowerCase())
            ) {
                result = true;
            }
        }
        return result;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidated(false);
            let body = {
                "author": author,
                "title": title,
                "category": category,
                "publicationDate": publicationDate,
                "description": description,
                "location": location,
            }

            if (isAlreadyInBooks(body)) {
                setWarningModal({open: true, book: body})
            } else {
                sendNewBook(body)
            }
        } else {
            setValidated(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        editMode ?
            <Card className={"mt-3 mb-3"} style={{padding: 30}}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <TextInput title="Autor" placeholder="np. Adam Mickiewicz" value={author} setValue={setAuthor}/>
                        <TextInput title="Tytuł" placeholder="np. Pan Tadeusz" value={title} setValue={setTitle}/>
                        <TextInput title="Kategoria" placeholder="np. Klasyka" value={category} setValue={setCategory}/>
                        <TextInput title="Data Wydania" placeholder="np. 2010" value={publicationDate}
                                   setValue={setPublicationDate}/>
                        <TextInput title="Notatki" placeholder="np. wydanie limitowane" value={description}
                                   setValue={setDescription}/>
                        <TextInput title="Lokalizacja" placeholder="np. nad biurkiem 3 regał 2 półka" value={location}
                                   setValue={setLocation}/>
                    </Form.Group>
                    <Button className={"mt-4"} type="submit">Dodaj książkę</Button>
                </Form>
            </Card> : null
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
