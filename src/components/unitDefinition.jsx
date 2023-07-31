import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import ModelFileUpload from './uploadFile';
import { modelsList } from '../assets/3dModelList';

// Function to get the model options for the dropdown
function getModelOptions() {
    let tempArr = JSON.parse(JSON.stringify(modelsList));
    tempArr.unshift({ title: 'חדש', id: 'new' });
    return tempArr;
}

function UnitDefinition(dataProps) {
    const [unitData, setUnitData] = useState(dataProps)
    const [selectedModel, setSelectedModel] = useState(unitData.model)
    const [selectModelOptions, setModelSelectOptions] = useState(getModelOptions)
    const viewerRef = useRef(null)
    const ModelViewer = () => {
        if (selectedModel) {
            const modelData = modelsList.find(f => f.id === selectedModel.id)
            console.log('selectedModel.src', selectedModel.src);
            return <model-viewer
                ref={viewerRef}
                src={modelData.src}
                alt="Model Preview"
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                interaction-prompt="none"
                shadow-intensity="1"
                ar
                autoplay
            // ios-src={URL.createObjectURL(previewFile)}
            ></model-viewer>
        }
    }
    const updateUnitDataState = () => {
        // Implement this function to update the unitData state with the changed data
        // Example: setUnitData(newData);
    };

    // Function to handle the "Save" button click
    const handleSave = () => {
        alert('unitData: ', unitData); // Replace this with the actual save functionality
    };

    return (
        <div className='card flex flex-row column-gap-3' style={{ direction: 'rtl' }}>
            {/* Card for unit data */}
            <div className="card flex flex-column gap-3">
                {/* Input group for activity title */}
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon ">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="שם הפעילות" value={unitData.title} />
                </div>
                {/* Input group for short description */}
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-info-circle"></i>
                    </span>
                    <InputTextarea placeholder="תיאור קצר" value={unitData.info} />
                </div>
                {/* Input group for activity type */}
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <Dropdown placeholder="סוג פעילות" value={unitData.type} />
                </div>
                {/* Input group for tags */}
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tags"></i>
                    </span>
                    <MultiSelect display='chip' placeholder="תגים" value={unitData.tags} />
                </div>
                {/* "Save" button */}
                <Button label='שמור' icon="pi pi-check" iconPos='right' onClick={handleSave} />
                {/* "Cancel" button */}
                <Button label='בטל' icon="pi pi-times" iconPos='right' severity='danger' />
            </div>
            {/* TabView for model selection */}
            <TabView className='w-full h-auto'>
                {/* TabPanel for choosing a model */}
                <TabPanel header="בחירת מודל"  >
                    {/* Dropdown to select a model */}
                    <Dropdown value={selectedModel} onChange={(e) => setSelectedModel(e.value)}
                        placeholder='בחר מודל' className='w-full' options={selectModelOptions}
                        optionLabel='title' panelStyle={{ direction: 'rtl' }} />
                    {/* Display the ModelFileUpload component or the ModelViewer component based on the selectedModel */}
                    {selectedModel && selectedModel.id === 'new' ? <ModelFileUpload /> : <ModelViewer />}
                </TabPanel>
                {/* TabPanel for uploading point cloud file */}
                <TabPanel header="קובץ נקודות">

                </TabPanel>
            </TabView>
        </div>
    );
}

export default UnitDefinition;
