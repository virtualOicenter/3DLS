import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import HotspotsArrFileEditor from './hotspotsArrFileEditor';
import ExerciseViewer from './exerciseViewer'
import ModelFileUpload from './uploadFile';
import { Fetch3DModelsArr, FetchHotspotsArrToModel, CreateExercise, FetchTagsOptions, UpdateExercise, UpdateHotspotsFile } from './fetchWixData';
import { modelsList } from '../assets/3dModelList';

const getModelOptions = (tempArr) => {
    let arr = Array.isArray(tempArr) ? tempArr : [];
    if (Array.isArray(arr)) {
        let toReturn = [...arr];
        toReturn.unshift({ title: 'חדש', _id: 'new' });
        return toReturn;
    }

    // If tempArr is a Promise, return an empty array
    return [];
}
const getHotspotsArrOptions = async (modelId) => {
    try {
        const hotspotsArr = await FetchHotspotsArrToModel(modelId);
        let tempArr = JSON.parse(JSON.stringify(hotspotsArr));
        tempArr.unshift({ title: 'חדש', _id: 'new' });
        return tempArr;
    } catch (error) {
        console.error('Error fetching hotspots array options', error);
        return [];
    }
};

function ExcerciseDefinition(dataProps) {
    const [exerciseData, setExerciseData] = useState(dataProps);
    const [selectedModel, setSelectedModel] = useState(exerciseData.model);
    const [selectedHotspotsFile, setSelectedHotspotsFile] = useState(exerciseData.hotspotsFile?._id);
    const [selectModelOptions, setModelSelectOptions] = useState([]);
    const [selectHotspotsArrOptions, setHotspotsArrOptions] = useState([]);
    const [selectTagsOptions, setSelectTags] = useState([])
    const [isHotspotsEditorVisible, setIsHotspotsEditorVisible] = useState(false)
    const viewerRef = useRef(null);

    const exerciseTypeOptions = [
        { 'label': 'בוחן גרירה', 'value': 'DND' },
        { 'label': 'אחר', 'value': 'OTHER' }
    ]
    useEffect(() => {
        let isMounted = true;

        const fetchModels = async () => {
            try {
                const modelsArr = await Fetch3DModelsArr();
                if (isMounted) {
                    setModelSelectOptions(getModelOptions(modelsArr));
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        const fetchTags = async () => {
            try {
                let tagsArr = await FetchTagsOptions()
                tagsArr = tagsArr.map(m => ({ 'title': m.title, '_id': m._id }));
                if (isMounted) {
                    setSelectTags(tagsArr)
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchModels();
        fetchTags();

        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        if (selectedModel && selectedModel._id != 'new') {
            getHotspotsArrOptions(selectedModel._id)
                .then(hotspotsArrOptions => {
                    setHotspotsArrOptions(hotspotsArrOptions);
                    setSelectedHotspotsFile(hotspotsArrOptions.find(f => f._id == exerciseData.hotspotsFile?._id))
                })
                .catch(error => {
                    console.error('Error fetching hotspots array options', error);
                });
        }
    }, [selectedModel]);

    const ModelViewer = () => {
        if (selectedModel && selectedModel.src) {
            return <model-viewer
                ref={viewerRef}
                src={selectedModel.src}
                alt="Model Preview"
                ar-modes="webxr scene-viewer quick-look"
                loading="eager" poster='../assets/Cube-1.5s-200px.svg'
                camera-controls
                interaction-prompt="none"
                shadow-intensity="1"
                ar
                autoplay
                // ios-src={URL.createObjectURL(previewFile)}
                style={{ direction: 'ltr' }}
            >
                {selectedHotspotsFile && selectedHotspotsFile.hotspots && selectedHotspotsFile.hotspots.map((hotspot, index) => {
                    return (<button
                        className={hotspot.userAnswer == ""
                            ? "Hotspot w-full"
                            : "AnsweredHotspot w-full"}
                        slot={hotspot.id}
                        data-surface={hotspot.dataSurface}
                        data-visibility-attribute="visible"
                        onClick={() => console.log(hotspot.id, "clicked")}
                        key={hotspot.id + index}
                    >
                        <div className="HotspotAnnotation w-full">{hotspot.title}
                            <div className="hotspotDot">.</div>
                        </div>
                    </button>)
                })}
            </model-viewer>
        }
    }

    const HotspotsArrFileForm = () => {
        return (
            <div className="card flex flex-column gap-2 mt-2 align-items-start">
                <div className="flex flex-row gap-3 w-full">
                    <div className="p-inputgroup flex">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-tag"></i>
                        </span>
                        <InputText
                            placeholder="שם הקובץ"
                            value={selectedHotspotsFile?.title}
                            onChange={(e) => {
                                console.log('changed hotspotsArr file name', e.target.value);
                                let _hotspotsFile = { ...selectedHotspotsFile, "title": e.target.value }; // Make a copy of the object
                                // _hotspotsFile.title = e.target.value;
                                console.log('exercise Data after change', _hotspotsFile);
                                // setSelectedHotspotsFile(_hotspotsFile);
                            }}
                        />
                    </div>
                    <Button className="w-5 gap-3" severity='secondary' label='צור קובץ נקודות חדש' icon='pi pi-plus' iconPos='right' />
                </div>
            </div>
        );
    };
    const hotspotsEditorFooter = () => {
        return (<div>
            <Button label='שמור' icon="pi pi-check" iconPos='right'
                onClick={() => { UpdateHotspotsFile(exerciseData.hotspotsFile) }} />
            <Button label='בטל' icon="pi pi-times" iconPos='right' severity='danger' />
        </div>)
    }
    const handleSave = () => {
        // console.log('exerciseData',exerciseData);
        exerciseData._id ? UpdateExercise(exerciseData) : CreateExercise(exerciseData).then(res => {
            console.log('creare exercise fetch result', res);
            setExerciseData(res)
        })
    }
    return (
        <div className='card flex flex-row column-gap-3' style={{ direction: 'rtl' }}>
            <div className="card flex flex-column gap-3">
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon ">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="שם התרגיל" value={exerciseData.title} onChange={e => { let _exerciseData = ({ ...exerciseData, 'title': e.target.value }); setExerciseData(_exerciseData) }} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-info-circle"></i>
                    </span>
                    <InputTextarea placeholder="תיאור קצר" value={exerciseData.info} onChange={e => { let _exerciseData = ({ ...exerciseData, 'info': e.target.value }); setExerciseData(_exerciseData) }} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <Dropdown placeholder="סוג פעילות" value={exerciseData.type} options={exerciseTypeOptions} optionLabel='label' optionValue='value'
                        onChange={(e) => {
                            let _exerciseData = ({ ...exerciseData, 'type': e.value });
                            setExerciseData(_exerciseData)
                        }} />
                </div>
                <div className="p-inputgroup flex">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tags"></i>
                    </span>
                    <MultiSelect display='chip' placeholder="תגים" value={exerciseData.tags} options={selectTagsOptions} optionLabel='title' onChange={e => { let _exerciseData = ({ ...exerciseData, 'tags': e.target.value }); setExerciseData(_exerciseData) }} />
                </div>
                <Button label='שמור' icon="pi pi-check" iconPos='right' onClick={handleSave} />
                <Button label='בטל' icon="pi pi-times" iconPos='right' severity='danger' />
            </div>
            <TabView className='w-full h-auto shadow-2'>
                <TabPanel header="בחירת מודל"  >
                    <Dropdown value={selectModelOptions.find(f => f._id == exerciseData.model?._id)}
                        onChange={(e) => {
                            setSelectedModel(e.value);
                            if (e.value !== 'new') {
                                let _exerciseData = ({ ...exerciseData, 'model': e.target.value });
                                setExerciseData(_exerciseData);
                            }
                        }}
                        placeholder='בחר מודל' className='w-full' options={selectModelOptions}
                        optionLabel='title' panelStyle={{ direction: 'rtl' }} />
                    {selectedModel && selectedModel._id == 'new' ? <ModelFileUpload /> : <ModelViewer />}
                </TabPanel>
                <TabPanel header="בחירת קובץ נקודות" disabled={!selectedModel || selectedModel._id == 'new'}>
                    <Dropdown
                        value={selectedHotspotsFile}
                        onChange={(e) => {
                            setSelectedHotspotsFile(e.target.value, selectedHotspotsFile);
                            if (e.value !== 'new') {
                                let _exerciseData = ({ ...exerciseData, 'hotspotsFile': e.target.value });
                                console.log('updated exercise data', exerciseData);
                                setExerciseData(_exerciseData);
                            }
                        }}
                        placeholder='בחר קובץ נקודות'
                        className='w-full'
                        options={selectHotspotsArrOptions}
                        optionLabel='title'
                        panelStyle={{ direction: 'rtl' }}
                    />
                    {selectedHotspotsFile && selectedHotspotsFile._id == 'new' ? (
                        <HotspotsArrFileForm />

                    ) : (
                        <div className='gap-3'>
                            <div className='flex justify-content-between '>
                                <Button className="w-max gap-3 gap-2 mt-2" severity='secondary' label='ערוך נקודות' icon='pi pi-plus' iconPos='right'
                                    onClick={() => setIsHotspotsEditorVisible(true)} />
                            </div>
                            <ModelViewer />
                            <Dialog header={`עריכת נקודות בקובץ ${exerciseData.hotspotsFile?.title}`}
                                footer={hotspotsEditorFooter()} visible={isHotspotsEditorVisible} onHide={() => setIsHotspotsEditorVisible(false)}
                                headerStyle={{ direction: 'rtl' }} className='w-8' >
                                <HotspotsArrFileEditor exerciseData={exerciseData} setExerciseData={setExerciseData} />
                            </Dialog>
                        </div>
                    )}
                </TabPanel>
                <TabPanel header="תצוגה מקדימה לפעילות" disabled={!selectedModel || !selectedHotspotsFile || exerciseData.hotspotsFile?._id == 'new'}>
                    <ExerciseViewer exerciseID={exerciseData._id} />
                </TabPanel>
            </TabView>

        </div>

    );
}

export default ExcerciseDefinition;
