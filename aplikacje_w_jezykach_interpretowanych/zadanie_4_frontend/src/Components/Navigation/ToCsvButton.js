import {Button} from "react-bootstrap";
import React from "react";

export function ToCsvButton({URL}) {
    async function saveFile() {
        let response = await fetch(`${URL}/csv`);
        let text = await response.text();
        let blob = new Blob([text], {type: 'text/plain'})
        let xd = document.createElement("a");
        let url = window.URL.createObjectURL(blob);
        xd.setAttribute("href", url);
        xd.setAttribute("download", "library.csv");
        xd.click();
        window.URL.revokeObjectURL(url)
    }

    return (
        <Button
            style={{minWidth: 300}}
            variant={"light"}
            onClick={() => {
                saveFile();
            }}
        >
           export in CSV format
        </Button>
    );
}
