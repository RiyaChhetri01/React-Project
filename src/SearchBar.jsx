import React, { useState, useEffect } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [countries, setCountries] = useState([]);

    // Fetch country data when the component mounts
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Handle input change and filter suggestions
    const handleChange = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.length > 0) {
            const filteredCountries = countries.filter(
                (country) =>
                    country.name.common.toLowerCase().includes(input.toLowerCase()) ||
                    country.capital?.[0]?.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredCountries);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search by country name or capital"
                value={query}
                onChange={handleChange}
                style={styles.input}
            />
            <div style={styles.suggestionBox}>
                {suggestions.map((country, index) => (
                    <div key={index} style={styles.suggestion}>
                        <strong>{country.name.common}</strong> - {country.capital?.[0]}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        margin: '50px auto',
        width: '400px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    suggestionBox: {
        marginTop: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
    },
    suggestion: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
    },
};

export default SearchBar;
