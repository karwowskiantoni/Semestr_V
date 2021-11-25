import {Button} from "react-bootstrap";
import React from "react";

export function FromCsvButton({URL, setShouldReload}) {

    function readFile(event) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = () => {
            fetch(`${URL}/csv`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: reader.result,
            }).then(response => {
                setShouldReload(Math.random())
            })
        };
    }

    function openFile() {
        let file = document.getElementById("input");
        file.click();
    }

    return (
        <label>
            <Button style={{minWidth: 300}}  variant={"light"} onClick={() => {
                openFile()
            }}>import from CSV file</Button>
            <input id="input" style={{display: "none"}} type="file" onChange={readFile}/>
        </label>
    );
}