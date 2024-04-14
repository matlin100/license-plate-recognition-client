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
        fetchPlates();
    }, []);

    const fetchPlates = async () => {
        try {
            const data = await getPlates();
            setPlates(data);
        } catch (error) {
            console.error("Fetching plates failed:", error);
        }
    };

    const handleAddOrUpdatePlate = async () => {
        console.log(edit ? 'Updating plate' : 'Adding new plate', formData);
        if (edit) {
            await updatePlate({ id: edit }, formData);
        } else {
            await createPlate(formData);
        }
        fetchPlates();
        handleResetForm();
    };

    const handleDeletePlate = async (plateId) => {
        await deletePlate({ id: plateId });
        fetchPlates();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleResetForm = () => {
        console.log('Resetting form');
        setEdit(null);
        setFormData({ plateNumber: '', userId: '' });
    };

    return (
        <div className='component'>
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
            <button onClick={handleAddOrUpdatePlate}>
                {edit ? 'Submit Update' : 'Add Plate'}
            </button>
            {edit && (
                <button onClick={handleResetForm}>Cancel Edit</button>
            )}
            {plates.map(plate => (
                <div key={plate._id}>
                    {plate.plateNumber} - {plate.userId}
                    <button onClick={() => {
                        console.log('Editing plate object:', plate);
                        setEdit(plate._id);
                        setFormData({ plateNumber: plate.plateNumber, userId: plate.userId });
                    }}>Edit</button>
                    <button onClick={() => handleDeletePlate(plate._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AllowedPlates;
