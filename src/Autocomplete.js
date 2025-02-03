import React, {createElement, useState, useEffect } from "react";
import { AutocompleteFile } from "./components/AutocompleteFile";

export function Autocomplete({ dataSource, searchMethod, onChangeAction, placeholderText, dataSourceAttribute }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && dataSource && dataSource.status === "available" && Array.isArray(dataSource.items)) {
            const mappedItems = dataSource.items.map(item => ({
                value: dataSourceAttribute.get(item)?.value ?? ""
            }));
            setItems(mappedItems);
        }
        return () => { isMounted = false; };
    }, [dataSource, dataSourceAttribute, items]);

    useEffect(()=>{
        setItems(items);
    },[items]);

    const handleValueChange = (newValue) => {
        setSelectedValue(newValue);

        if (onChangeAction?.execute) {
            onChangeAction.execute();
        }
    };

    return (
        <div>
            <h6>CCG Widget</h6>
            <AutocompleteFile
                value={selectedValue}
                onValueChange={handleValueChange}
                dataSource={items}
                searchMethod={searchMethod}
                placeholderText={placeholderText}
            />
        </div>
    );
}
