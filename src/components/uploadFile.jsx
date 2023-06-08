//3605a6665b1759c818d57e33c0ab0127b087fa0c
//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
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';


function ModelFileUpload() {
    const viewerRef = useRef(null);
    const [file, setFile] = useState(null);
    const [modelUploaded, setModelUploaded] = useState(false);


    const [modelData, setModelData] = useState({
        id: '',
        src: '',
        title: '',
        description: '',
        attribution: '',
        url: '',
        linkedHotspotsFiles: [''],
        additionalProps: [{
            "cameraOrbit": "",
            "fieldOfView": ""
        }]
    },)


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
    /**
 {
        id: 'digestive_system',
        src: 'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels@15a8c378fe92860478ee9142e68e7aadb8241169/disgestive_system.glb',
        title: 'Digestive System',
        description: 'Digestive System',
        attribution: 'Disgestive system by Enas on Sketchfab',
        url: 'https://skfb.ly/6ZPZx',
        linkedHotspotsFiles: ['osnat_digestiveSystem'],
        additionalProps: [{
            "cameraOrbit": "0deg 75deg 4.148m",
            "fieldOfView": "30deg"
        }]
    },
 */
    const ModelDataForm = () => {
        return <div className='flex flex-row gap-3'>
            <div className='flex flex-column gap-2'>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder='כותרת' value={modelData.title} onChange={e => { let _modelData = ({ ...modelData, 'title': e.target.value }); setModelData(_modelData) }} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-info-circle"></i>
                    </span>
                    <InputText placeholder='תיאור קצר' value={modelData.description} onChange={e => { let _modelData = ({ ...modelData, 'description': e.target.value }); setModelData(_modelData) }} />
                </div>
                {/* <div className="p-inputgroup flex">
                    <Button className='w-full' label='שמור זווית צפייה' icon='pi pi-eye' iconPos='right' severity='secondary' onClick={e => { console.log(viewerRef.current.getCameraTarget()); }} />
                </div> */}
            </div>
            <div className='flex flex-column gap-2'>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <InputText placeholder='זכויות יוצרים (אם יש)' value={modelData.attribution} onChange={e => { let _modelData = ({ ...modelData, 'attribution': e.target.value }); setModelData(_modelData) }} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <InputText placeholder='קישור למקור (אם יש)' value={modelData.url} onChange={e => { let _modelData = ({ ...modelData, 'url': e.target.value }); setModelData(_modelData) }} />
                </div>
            </div>

        </div>
    }
    const modelPreview = (previewFile) => {
        const handleViewerLoad = () => {
            // Do something when the model viewer has loaded
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px' }} className='gap-2'>
                <h5>{previewFile.name}</h5>
                <ModelDataForm />
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
                emptyTemplate={<p>גרור קובץ להעלאה.</p>} headerStyle={{ direction: 'ltr' }} />
        </div>
    );
}

export default ModelFileUpload;
