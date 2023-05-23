import React, { useState } from 'react';
import axios from 'axios';


function FileUploadForm() {
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/datain/image', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default FileUploadForm;