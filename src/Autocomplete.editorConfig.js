/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

const AutocompleteConfig = {
    getValues: function (entity, properties) {
        return {
            dataSource: properties.dataSource || "", 
            minimumInputLength: properties.minimumInputLength || 3,
            searchDelay: properties.searchDelay || 300, 
            searchType: properties.searchType || "contains",
            placeholderText: properties.placeholderText?.text || "Search...",
            noResultsText: properties.noResultsText?.text || "No results found", 
            searchingText: properties.searchingText?.text || "Searching..."
        };
    },

    /**
     * Validates the widget properties in Mendix Studio.
     * @param {Properties} values 
     * @returns {Problem[]} 
     */
    validate: function (values) {
        const problems = [];

        if (values.minimumInputLength < 1) {
            problems.push({
                property: "minimumInputLength",
                severity: "error",
                message: "Minimum input length must be at least 1.",
                studioMessage: "Enter a value greater than 0."
            });
        }

        if (!values.dataSource) {
            problems.push({
                property: "dataSource",
                severity: "error",
                message: "A data source must be provided for autocomplete options.",
                studioMessage: "Select a data source for the dropdown."
            });
        }

        return problems;
    }
};

export default AutocompleteConfig;
