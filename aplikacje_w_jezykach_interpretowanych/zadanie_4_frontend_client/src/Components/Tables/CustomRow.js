export function CustomRow({elements, isHead}) {

    return (
        <tr key={elements[0]}>
            {elements.map((element, index) => isHead ? <th key={index}>{element}</th> :
                <td style={{width: 300}} key={index}>{Array.isArray(element) ? element[0] : element}</td>)}
        </tr>
    );
}