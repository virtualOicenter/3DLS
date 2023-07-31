import React, { useState, useRef, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Create3DModel } from './fetchWixData';
import { ModelDataForm } from './modelDataForm';
import { PreviewModel } from './previewModel';
import { Button } from 'primereact/button';
function ModelFileUpload() {
    const toast = useRef(null);
    const viewerRef = useRef(null);
    const [file, setFile] = useState(null);
    const [urlInput, setUrlInput] = useState("");
    const [modelData, setModelData] = useState({
        modelId: '',
        src: '',
        title: '',
        description: '',
        attribution: '',
        modelUrl: '',
        pairedHotspots: [],
        additionalProps: {
            "cameraOrbit": "",
            "fieldOfView": ""
        }
    },)
    
    useEffect(() => {
        if (file) {
            setModelData((prevModelData) => ({
                ...prevModelData,
                src: `https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels/${file.name}`,
                modelId: file.name.split('.glb')[0]
            }));
        }
    }, [file]);
    // Function to handle the file upload
    const handleFileUpload = async (event) => {
        setFile(event.files[0]);
        console.log('selected file', file);
        if (checkFieldsNotEmpty() && file) {
            console.log(modelData);
            await uploadFileToGithub().then(async () => {
                await create3DModelInWix().catch(error => {
                    console.log('error uploading 3d model to wix', error);
                    toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בהעלאת מודל לוויקס' });
                })
            }).catch(error => {
                console.log('error uploading 3d model to github', error);
                toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בהעלאת מודל לגיטהאב' });
            })
            toast.current.show({ severity: 'success', summary: 'העלאה הצליחה', detail: 'העלאת הקובץ הצליחה' });
        }
        else {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'אנא מלאו כותרת ותיאור קצר לקובץ' });
        }

    };
    const create3DModelInWix = async () => {
        if (checkFieldsNotEmpty()) {
            await Create3DModel(modelData).then(res => {
                toast.current.show({ severity: 'success', summary: 'העלאה הצליחה', detail: 'העלאת הקובץ הצליחה' });
                console.log('succesful wix database 3d model upload', res);
                return res
            }).catch((error) => {
                console.log('error uploading 3d model to wix', error);
                toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בהעלאת מודל לוויקס' });
                return error
            });
        }
    }
    // Function to upload the file to GitHub repository
    const uploadFileToGithub = async () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const content = event.target.result.split(',')[1];

                const requestData = {
                    message: 'Upload file',
                    content: content,
                };

                const mainToken = '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';
                const NUC_Token = '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'
                await fetch(`https://api.github.com/repos/virtualOicenter/3dModels/contents/${file.name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${NUC_Token}`,
                    },
                    body: JSON.stringify(requestData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('File uploaded successfully to github', data);
                    })
                    .catch((error) => {
                        console.error('Error uploading file:', error);
                    });
            };

            reader.readAsDataURL(file);
        }
    };

    const checkFieldsNotEmpty = () => {
        const { title, description, attribution, url } = modelData;
        const isTitleValid = title.trim() !== '';
        const isDescriptionValid = description.trim() !== '';
        // const isAttributionValid = attribution.trim() !== '';
        // const isUrlValid = url.trim() !== '';

        return isTitleValid && isDescriptionValid //&& isAttributionValid && isUrlValid;
    };


    const modelPreview = (previewFile) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px' }} className='gap-2'>
                <h5>{previewFile.name}</h5>
                {ModelDataForm(modelData, setModelData)}
                {PreviewModel(viewerRef, URL.createObjectURL(previewFile))}
            </div>
        );
    }
    return (
        <div className='flex w-full'>
            <Toast ref={toast} />
            {/* <FileUpload mode="advanced" customUpload uploadHandler={handleFileUpload} accept='.glb'
                maxFileSize={100000000} itemTemplate={modelPreview} multiple={false} className='flex flex-column w-full'
                emptyTemplate={<p>גרור קובץ להעלאה.</p>} headerStyle={{ direction: 'ltr' }} /> */}
            <div className='flex flex-column w-full gap-2'>
                <div className='w-full flex gap-2 mt-2'>
                    <InputText className='w-full' value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder='github permalink' />
                    <Button label='נסה' severity='secondary' onClick={e=>{setModelData({...modelData,'src':changeUrl(urlInput)})}}/>
                </div>
                {ModelDataForm(modelData, setModelData)}
                {viewerRef.current && viewerRef.current.loaded && checkFieldsNotEmpty() &&<Button label='שמור' onClick={(e) => {create3DModelInWix() }} />}
                {modelData.src && PreviewModel(viewerRef, modelData.src)}
            </div>
        </div>
    );
}
const changeUrl = (beforeUrl) => {
    // Extract the file name from the beforeUrl
    const fileName = beforeUrl.split('/').pop();

    // Construct the new afterUrl
    const afterUrl = `https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels/${fileName}`;

    return afterUrl;
};
export default ModelFileUpload;