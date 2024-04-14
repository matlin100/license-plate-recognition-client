import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, CircularProgress } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { searchPlateHistory } from '../api/plateHistoryApi';
import './PlateHistory.css'; // Optionally include custom CSS for additional styling

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PlateHistory = () => {
    const [searchParams, setSearchParams] = useState({
        plateNumber: '',
        startDate: '',
        endDate: ''
    });
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    const handleSearch = useCallback(async (resetPage = false) => {
        if (resetPage) setCurrentPage(1);
        setIsLoading(true);  // Start loading before the API request
        try {
            const data = await searchPlateHistory({...searchParams, page: currentPage});
            setResults(data.documents);
            setIsLoading(false);  // Stop loading on successful data fetch
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
            setIsLoading(false);  // Stop loading on error
        }
    }, [searchParams, currentPage]);
    

    useEffect(() => {
        handleSearch();
    }, [currentPage, handleSearch]);

    const handleInputChange = (e) => {
        setSearchParams({...searchParams, [e.target.name]: e.target.value});
    };

    return (
        <Paper className='component' elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" color="primary">Search Plate History</Typography>
            <TextField label="Plate Number" variant="outlined" value={searchParams.plateNumber} onChange={handleInputChange} name="plateNumber" fullWidth margin="normal"/>
            <TextField type="date" label="Start Date" variant="outlined" value={searchParams.startDate} onChange={handleInputChange} name="startDate" fullWidth margin="normal" InputLabelProps={{ shrink: true }}/>
            <TextField type="date" label="End Date" variant="outlined" value={searchParams.endDate} onChange={handleInputChange} name="endDate" fullWidth margin="normal" InputLabelProps={{ shrink: true }}/>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => handleSearch(true)}>Search</Button>
                {isLoading && <CircularProgress size={24} sx={{ marginLeft: 2 }} />}
            </Box>
            {!isLoading && results.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Plate Number</StyledTableCell>
                                <StyledTableCell>Time Detected</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="right">{item.plate_number}</StyledTableCell>
                                    <StyledTableCell align="right">{new Date(item.timestamp).toLocaleString()}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
    
};

export default PlateHistory;
