import {Form, FormControl, FormGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export function TableFilter({data, setFilteredData}) {

    const [value, setValue] = useState("");

    useEffect(() =>{
        setFilteredData(data.filter(product => haveSubstringInAnyProperty(value, product)))
    },[data, setFilteredData, value])
    function haveSubstringInAnyProperty(subString, object) {
        for (let key in object) {
            if (object[key].toString().toLowerCase().includes(subString.toLowerCase()))
                return true;
        }
        return false
    }

    return (
        <Form className={"mb-4"}>
            <FormGroup>
                <FormControl onChange={text => {
                    if (data !== undefined && Array.isArray(data) && data.length > 0) {
                        setValue(text.target.value)
                    }
                }}
                             onKeyPress={event => event.key === 'Enter' && event.preventDefault()}
                             placeholder={"search..."}/>
            </FormGroup>
        </Form>
    );
}