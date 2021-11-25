import React, {useEffect, useState} from "react";
import {BookTable} from "./Components/Tables/BookTable";
import {TableFilter} from "./Components/Tables/TableFilter";
import {Bar} from "./Components/Navigation/Bar";
import {ToastContainer} from "react-bootstrap";
import {CreateBookPanel} from "./Components/AddPanels/CreateBookPanel";
import {WarningModal} from "./Components/Modals/WarningModal";
import {CustomToast} from "./Components/Modals/CustomToast";
import {EditModal} from "./Components/Modals/EditModal";

export function BookPage() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [shouldReload, setShouldReload] = useState(0);
    const [newBookMode, setNewBookMode] = useState(false);
    const [toast, setToast] = useState({
        open: false, book: {
            "author": "",
            "title": "",
            "category": "",
            "publicationDate": "",
            "description": "",
            "location": "",
        }
    });
    const [warningModal, setWarningModal] = useState({
        open: false, book: {
            "author": "",
            "title": "",
            "category": "",
            "publicationDate": "",
            "description": "",
            "location": "",
        }
    });
    const [editModal, setEditModal] = useState({
        open: false, book: {
            "author": "",
            "title": "",
            "category": "",
            "publicationDate": "",
            "description": "",
            "location": "",
        }
    });
    const URL = "/book"
    // const URL = "http://localhost:5000/book"
    useEffect(() => {
        async function fetchAPI() {
            let response = await fetch(URL);
            let json = await response.json();
            setBooks(json);
            setFilteredBooks(json);
        }

        fetchAPI();
    }, [shouldReload]);

    return (
        <div style={{backgroundColor: "#FFFFFF", padding: 100}}>
            <Bar URL={URL}
                 setShouldReload={setShouldReload}
                 size={filteredBooks.length}
                 newBookMode={newBookMode}
                 setNewBookMode={setNewBookMode}
            />
            <WarningModal info={warningModal} setInfo={setWarningModal}/>
            <EditModal info={editModal}
                       setInfo={setEditModal}
                       URL={URL}
                       setShouldReload={setShouldReload}/>
            <ToastContainer position={'top-end'}>
                <CustomToast info={toast}
                             setInfo={setToast}/>
            </ToastContainer>
            <CreateBookPanel URL={URL}
                             setShouldReload={setShouldReload}
                             editMode={newBookMode}
                             setWarningModal={setWarningModal}
                             books={books}
                             setToast={setToast}/>
            <TableFilter data={books}
                         setFilteredData={setFilteredBooks}/>
            <BookTable
                setEditModal={setEditModal}
                books={filteredBooks}
            />
        </div>
    );
}
