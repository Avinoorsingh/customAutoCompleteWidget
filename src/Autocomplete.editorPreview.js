import { createElement, useState } from "react";
import { Autocomplete } from "./Autocomplete"; 
import { AutocompleteFile } from "./components/AutocompleteFile";

export function preview({ placeholderText, minimumInputLength, searchType }) {

    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (newValue) => {
        setSelectedValue(newValue);
        console.log("Preview selected:", newValue);
    };

    return (
        <div
            key="uniqueKey"
            style={{
                width: "250px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "#f9f9f9"
            }}
        >
            <h4 style={{ marginBottom: "8px" }}>Preview Mode</h4>
            <AutocompleteFile
                value={selectedValue}
                onChange={handleChange}
                minimumInputLength={minimumInputLength || 1}
                searchType={searchType || "contains"}
                placeholderText={placeholderText || "Search..."}
            />
        </div>
    );
}

export function getPreviewCss() {
    return require("./ui/Autocomplete.css");
}
