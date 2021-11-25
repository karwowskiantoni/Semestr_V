export function CustomRow({elements: element, isHead, setEditModal}) {

    return (
        <tr onClick={() => setEditModal({
            open: true,
            product:element
        })} key={element.name}>
            {process(element).map((element, index) => isHead ? <th key={index}>{element}</th> :
                <td key={index}>{Array.isArray(element) ? element[0] : element}</td>)}
        </tr>
    );
}

export function process(object) {
    if (Array.isArray(object)) {
        return object
    } else {
        return Object.values(object)
    }
}
