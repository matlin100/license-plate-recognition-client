import React, { useState, useEffect } from 'react';
import { createPlate, getPlates, updatePlate, deletePlate } from '../api/allowedPlatesApi';
import './AllowedPlates.css';

const AllowedPlates = () => {
    const [plates, setPlates] = useState([]);
    const [edit, setEdit] = useState(null);
    const [formData, setFormData] = useState({
        plateNumber: '',
        userId: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllPlates = async () => {
            const plates = await getPlates();
            setPlates(plates);
        };
        fetchAllPlates();
    }, []);
    
    const fetchPlates = async () => {
        try {
            const data = await getPlates();
            setPlates(data);
        } catch (error) {
            console.error("Fetching plates failed:", error);
        }
    };

    const checInput = () => {
        if (!/^\d{6,8}$/.test(formData.plateNumber)) {
            setError('Plate number must be between 6 and 8 digits.');
            return 1;
        }
        if (!/^\d{7}$/.test(formData.userId)) {
            setError('User ID must be 7 digits.');
            return 2;
        }
        setError('');
        return 0;
    };

    const handleAddPlate = async () => {
        const validationResult = checInput();
        if (validationResult !== 0) {
            return;
        }
        await createPlate(formData);
        fetchPlates();
        setFormData({ plateNumber: '', userId: '' }); // Reset the form
    };

    const handleUpdatePlate = async () => {
        const validationResult = checInput();
        if (validationResult !== 0) {
            return;
        }
        try {
            await updatePlate(edit, formData); // Pass the plate ID to updatePlate
            fetchPlates();
            setEdit(null); // Reset edit mode
            setFormData({ plateNumber: '', userId: '' }); // Reset the form
        } catch (error) {
            console.error('Failed to update plate:', error);
        }
    };

    const handleDeletePlate = async (plateId) => {
        await deletePlate(plateId);
        fetchPlates();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container">
            <h1 className="title">Plates</h1>
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    name="plateNumber"
                    value={formData.plateNumber}
                    onChange={handleChange}
                    placeholder="Plate Number (6-8 digits)"
                />
                <input
                    className="input"
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID (7 digits)"
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-container">
                {edit ? (
                    <button className="button" onClick={handleUpdatePlate}>Update Plate</button>
                ) : (
                    <button className="button" onClick={handleAddPlate}>Add Plate</button>
                )}
            </div>
            <div className="plate-container">
                <div className="table-description">
                    <div>Plate Number</div>
                    <div>User ID</div>
                    <div>Actions</div>
                </div>
                {plates.map(plate => (
                    <div key={plate._id} className="plate-item">
                    <div>{plate.plateNumber}</div>
                    <div>{plate.userId}</div>
                    <div>
                        <button className="button" onClick={() => { setEdit(plate._id); setFormData({ plateNumber: plate.plateNumber, userId: plate.userId }); }}>Edit</button>
                        <button className="button" onClick={() => handleDeletePlate(plate._id)}>Delete</button>
                    </div>
                    </div>
                ))}
                </div>
        </div>
    );
}

export default AllowedPlates;