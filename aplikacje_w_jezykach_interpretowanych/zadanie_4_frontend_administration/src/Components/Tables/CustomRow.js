export function CustomRow({elements: element, isHead, setEditModal}) {

    return (
        <tr onClick={() => setEditModal({
            open: true,
            product: element,
            order: element
        })} key={element.name}>
            {process(element).map((element, index) => isHead ? <th key={index}>{element}</th> :
                <td key={index}>
                    {element === null
                        ? ""
                        : element.toString().split('\n').map((line, index) =>
                            <p key={index}>{line}</p>)}
                </td>
            )}
        </tr>
    );
}

export function process(object)
{
    if (Array.isArray(object)) {
        return object
    } else {
        return Object.values(object)
    }
}
