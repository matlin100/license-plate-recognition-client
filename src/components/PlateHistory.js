import React, { useState, useEffect, useCallback } from 'react';
import { searchPlateHistory } from '../api/plateHistoryApi';

const PlateHistory = () => {
    const [searchParams, setSearchParams] = useState({
        plateNumber: '',
        startDate: '',
        endDate: ''
    });
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    const handleSearch = useCallback(async (resetPage = false) => {
        if (resetPage) setCurrentPage(1);
        try {
            const data = await searchPlateHistory({...searchParams, page: currentPage});
            setResults(data.documents);
            setTotalPages(data.totalPages);
            updateDateExtremes(data.documents);
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        }
    }, [searchParams, currentPage]);

    useEffect(() => {
        handleSearch();
    }, [currentPage, handleSearch]);

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(Math.max(1, currentPage - 1));
    };

    const updateDateExtremes = (documents) => {
        if (documents.length === 0) return;
        const dates = documents.map(doc => new Date(doc.timestamp));
        setMinDate(new Date(Math.min(...dates)).toLocaleDateString());
        setMaxDate(new Date(Math.max(...dates)).toLocaleDateString());
    };

    return (
        <div className='component'>
            <h2>Search Plate History</h2>
            <input name="plateNumber" value={searchParams.plateNumber} onChange={handleInputChange} placeholder="Plate Number" />
            <input type="date" name="startDate" value={searchParams.startDate} onChange={handleInputChange} />
            <input type="date" name="endDate" value={searchParams.endDate} onChange={handleInputChange} />
            <button onClick={() => handleSearch(true)}>Search</button>
            {minDate && maxDate && (
                <p>Date Range: {minDate} - {maxDate}</p>
            )}
            <div>
                {results.map((item, index) => (
                    <div key={index}>
                        <p>Plate: {item.plate_number}, Time: {new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            {results.length > 0 && (
                <div>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default PlateHistory;
