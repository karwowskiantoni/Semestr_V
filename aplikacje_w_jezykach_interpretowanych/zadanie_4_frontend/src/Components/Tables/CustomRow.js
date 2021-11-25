export function CustomRow({elements, isHead, setEditModal}) {

    return (
        <tr onClick={() => setEditModal({
            open: true,
            book: {
                "author": elements[0],
                "title": elements[1],
                "category": elements[2],
                "publicationDate": elements[3],
                "description": elements[4],
                "location": elements[5]
            }
        })} key={elements.name}>
            {elements.map((element, index) => isHead ? <th key={index}>{element}</th> :
                <td key={index}>{Array.isArray(element) ? element[0] : element}</td>)}
        </tr>
    );
}