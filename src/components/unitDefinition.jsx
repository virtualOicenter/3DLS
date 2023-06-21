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

    }
    const handleSave = () => {
        alert('unitData: ', unitData)
    }
    return (
        <div className='card flex flex-row column-gap-3' style={{ direction: 'rtl' }}>
            <div className="card flex flex-column gap-3">
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon ">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="שם הפעילות" value={unitData.title} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-info-circle"></i>
                    </span>
                    <InputTextarea placeholder="תיאור קצר" value={unitData.info} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <Dropdown placeholder="סוג פעילות" value={unitData.type} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tags"></i>
                    </span>
                    <MultiSelect display='chip' placeholder="תגים" value={unitData.tags} />
                </div>

                <Button label='שמור' icon="pi pi-check" iconPos='right' onClick={handleSave} />
                <Button label='בטל' icon="pi pi-times" iconPos='right' severity='danger' />
            </div>
            <TabView className='w-full h-auto'>
                <TabPanel header="בחירת מודל"  >
                    <Dropdown value={selectedModel} onChange={(e) => setSelectedModel(e.value)}
                        placeholder='בחר מודל' className='w-full' options={selectModelOptions}
                        optionLabel='title' panelStyle={{ direction: 'rtl' }} />
                    {selectedModel && selectedModel.id == 'new' ? <ModelFileUpload /> : <ModelViewer />}
                </TabPanel>
                <TabPanel header="קובץ נקודות">

                </TabPanel>
            </TabView>

        </div>

    );
}

export default UnitDefinition;
