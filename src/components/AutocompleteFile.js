import React, {createElement, useState, useEffect, useRef } from "react";
import "../ui/Autocomplete.css";

export function AutocompleteFile({ value, dataSource, searchMethod, onValueChange, placeholderText }) {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [bool, setBool]=useState(true);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && dataSource && dataSource.length!=0) {
            const fullObjects =dataSource.map(item =>
                typeof item === "object" && item !== null ? { value: item.value ?? "" } : { value: "" }
            );

            setSuggestions(fullObjects);
        }
        return () => { isMounted = false; };
    }, [dataSource]);


    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setBool(true);
        if (!newValue) {
            setSuggestions(dataSource.map(item => ({ value: item.value ?? "" })));
            return;
        }

        const filteredSuggestions = suggestions
        .filter(item => 
            typeof item.value === "string" && 
            (searchMethod === "contains"
                ? item.value.toLowerCase().includes(newValue.toLowerCase())
                : item.value.toLowerCase().startsWith(newValue.toLowerCase()))
        );

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions(dataSource.map(item => ({ value: item.value ?? "" })));
        setBool(false);
        if (onValueChange) {
            onValueChange(suggestion);
        }
    };

    const renderSuggestions = () => {
        if (((!suggestions || suggestions.length === 0 ||  !inputValue ))) return null;

        return (
            bool!=false?
            <div key="uniqueKey" className="autocomplete-items">
                {suggestions.map((suggestion, index) => (
                     <React.Fragment key={index}>
                    <div style={{borderBottom: "1px solid grey", background: "lightgrey"}}  key={index} onClick={() => handleSuggestionClick(suggestion.value)}>
                        <strong>{suggestion.value.substring(0, inputValue.length)}</strong>
                        {suggestion.value.substring(inputValue.length)}
                    </div>
                     </React.Fragment>
                ))
                }
            </div>:<div key="uniqueKey"></div>
        );
    };

    return (
        <div key="uniqueKey" ref={inputRef} className="autocomplete-container">
            <input
                style={{border: "1px solid black" }}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholderText || "Search..."}
                className="form-control"
            />
            {renderSuggestions()}
        </div>
    );
}
