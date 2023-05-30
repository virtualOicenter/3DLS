//3605a6665b1759c818d57e33c0ab0127b087fa0c
//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
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

function GithubFileUpload() {
    const [file, setFile] = useState(null);

    // Function to handle the file upload
    const handleFileUpload = (event) => {
        console.log('selected file', file);
        if (event.files[0].name.endsWith('.glb')) setFile(event.files[0]);
    };

    // Function to upload the file to GitHub repository
    const uploadFileToGithub = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result.split(',')[1];

                const requestData = {
                    message: 'Upload file',
                    content: content,
                };

                const token = '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'; // Replace with your GitHub personal access token

                fetch(`https://api.github.com/repos/virtualOicenter/3dModels/contents/${file.name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('File uploaded successfully:', data);
                    })
                    .catch((error) => {
                        console.error('Error uploading file:', error);
                    });
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <FileUpload mode="basic" auto customUpload uploadHandler={handleFileUpload} className='fileUploadButton' />
            <Button label="Upload to GitHub" onClick={uploadFileToGithub} />
        </div>
    );
}

export default GithubFileUpload;
