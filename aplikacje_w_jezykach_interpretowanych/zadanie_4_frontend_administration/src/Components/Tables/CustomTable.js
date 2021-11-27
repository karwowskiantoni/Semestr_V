import {Table} from "react-bootstrap";
import {CustomRow} from "./CustomRow";
import {useEffect, useState} from "react";
import {process} from "./CustomRow";

export function CustomTable({head = [], data, bottom = [], setEditModal}) {

    const [body, setBody] = useState([]);
    const [sortedBy, setSortedBy] = useState("name");
    useEffect(() => {
            if (sortedBy.includes("!")) {
                setBody([...data.sort((a, b) => comparator(b, a, head.findIndex((element) => sortedBy.includes(element)))).slice(0, 200)])
            } else {
                setBody([...data.sort((a, b) => comparator(a, b, head.findIndex((element) => sortedBy.includes(element)))).slice(0, 200)])
            }
        }, [data, head, sortedBy]
    );

    function comparator(a, b, index) {
        return String(process(a)[index]).localeCompare(String(process(b)[index]))
    }

    return (
        <Table size="sm" hover striped bordered>
            <thead>
            <CustomRow
                elements={
                    head.map((header, index) =>
                        <label
                            onClick={() => {
                                if (sortedBy === "!" + header) {
                                    setSortedBy(header);
                                } else {
                                    setSortedBy("!" + header);
                                }
                            }}
                        >
                            {header}
                        </label>)
                }

                setEditModal={() => {
                }}
                isHead={true}/>
            </thead>
            <tbody>
            {body.map((row, index) => <CustomRow setEditModal={setEditModal} key={index} elements={row}/>)}
            <CustomRow elements={bottom} isHead={true}/>
            </tbody>
        </Table>
    );
}