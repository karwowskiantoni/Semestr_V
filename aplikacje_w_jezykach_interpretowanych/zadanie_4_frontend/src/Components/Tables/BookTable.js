import {CustomTable} from "./CustomTable";

export function BookTable({books, setEditModal}) {

    return (
            <CustomTable
                head={[
                    "autor",
                    "tytuł",
                    "kategoria",
                    "data wydania",
                    "notatki",
                    "lokalizacja",
                ]}
                data={
                    !Array.isArray(books)
                        ? []
                        : books.map((book) => {
                            return [
                                book.author,
                                book.title,
                                book.category,
                                book.publicationDate,
                                book.description,
                                book.location,
                            ];
                        })
                }
                setEditModal={setEditModal}
            />
    );
}
