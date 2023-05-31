//3605a6665b1759c818d57e33c0ab0127b087fa0c
//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
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

function ModelFileUpload() {
    const [file, setFile] = useState(null);
    const viewerRef = useRef(null);

    // Function to handle the file upload
    const handleFileUpload = (event) => {
        setFile(event.files[0]);
        console.log('selected file', file);
        uploadFileToGithub()
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
    const modelPreview = (previewFile) => {
        const handleViewerLoad = () => {
            // Do something when the model viewer has loaded
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h5>{previewFile.name}</h5>
                <model-viewer
                    ref={viewerRef}
                    src={URL.createObjectURL(previewFile)}
                    alt="Model Preview"
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    interaction-prompt="none"
                    shadow-intensity="1"
                    ar
                    autoplay
                // ios-src={URL.createObjectURL(previewFile)}
                ></model-viewer>
            </div>
        );
    }
    return (
        <div className='flex w-full'>
            <FileUpload mode="advanced" customUpload uploadHandler={handleFileUpload} accept='.glb'
                maxFileSize={100000000} itemTemplate={modelPreview} multiple={false} className='flex flex-column w-full'
                emptyTemplate={<p>גרור קובץ להעלאה.</p>} headerStyle={{direction:'ltr'}} />
        </div>
    );
}

export default ModelFileUpload;
