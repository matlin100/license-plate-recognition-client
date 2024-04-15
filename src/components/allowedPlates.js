import React, { useState, useEffect } from 'react';
import { createPlate, getPlates, updatePlate, deletePlate } from '../api/allowedPlatesApi';

const AllowedPlates = () => {
    const [plates, setPlates] = useState([]);
    const [edit, setEdit] = useState(null);
    const [formData, setFormData] = useState({
        plateNumber: '',
        userId: ''
    });

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

    const handleAddPlate = async () => {
        await createPlate(formData);
        fetchPlates();
        setFormData({ plateNumber: '', userId: '' }); // Reset the form
    };

    const handleUpdatePlate = async () => {
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Plates</h1>
            <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
            />
            <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="User ID"
            />
            {edit ? (
                <button onClick={handleUpdatePlate}>Update Plate</button>
            ) : (
                <button onClick={handleAddPlate}>Add Plate</button>
            )}

            {plates.map(plate => (
                
                <div key={plate._id}>
                    {plate.plateNumber} - {plate.userId}
                    <button onClick={() => { setEdit(plate._id); setFormData({ plateNumber: plate.plateNumber, userId: plate.userId }); console.log(plate) }}>Edit</button>
                    <button onClick={() => handleDeletePlate(plate._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AllowedPlates;
