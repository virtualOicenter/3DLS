import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips'
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';

export default function HotspotsTable(userSetHotspots, setUserSetHotspots, exerciseType) {
    const [expandedRows, setExpandedRows] = useState(null);
    const questionTypeOptions = [{ 'label': 'מידע', 'value': 'INFO' }, { 'label': 'שאלה', 'value': 'QUESTION' }, { 'label': 'פעולה', 'value': 'ACTION' }]
    const onCellEditComplete = (e) => {
        let _userSetHotspots = [...userSetHotspots];
        let { newData, index } = e;

        _userSetHotspots[index] = newData;

        setUserSetHotspots(_userSetHotspots);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const removeHotspot = (id) => {
        let _newArray = userSetHotspots.filter(f => f.id != id)
        setUserSetHotspots(_newArray)
    }
    const removeButtonTemplate = (rowData) => {
        return <Button icon="pi pi-times" severity="danger" onClick={() => removeHotspot(rowData.id)} size='small'></Button>
    }
    const changeHotspotType = (newTypeValue) => {
        let _userSetHotspots = userSetHotspots.map((hotspot, index) => ({ ...hotspot, type: newTypeValue }))
        setUserSetHotspots(_userSetHotspots)
    }
    const changeHotspotQuestion = (newQuestionValue) => {
        let _userSetHotspots = userSetHotspots.map((hotspot, index) => ({ ...hotspot, question: newQuestionValue }))
        setUserSetHotspots(_userSetHotspots)
    }
    const changeHotspotOptions = (newOptionsValue) => {
        let _userSetHotspots = userSetHotspots.map((hotspot, index) => ({ ...hotspot, options: newOptionsValue }))
        setUserSetHotspots(_userSetHotspots)
    }
    const changeHotspotAnswer = (newAnswerValue) => {
        let _userSetHotspots = userSetHotspots.map((hotspot, index) => ({ ...hotspot, answer: newAnswerValue }))
        setUserSetHotspots(_userSetHotspots)
    }
    const changeHotspotInfo = (newInfoValue) => {
        let _userSetHotspots = userSetHotspots.map((hotspot, index) => ({ ...hotspot, info: newInfoValue }))
        setUserSetHotspots(_userSetHotspots)
    }
    const rowExpansionTemplate = (rowData) => {
        return (
            <Card>
                <div className="flex flex-column gap-3 h-full text-right" style={{ direction: 'rtl' }}>
                    <span className="p-float-label">
                        <label htmlFor="hotspotType" className='relative mr-3' >בחר סוג</label>
                        <Dropdown id='hotspotType' options={questionTypeOptions} value={rowData.type} onChange={(e) => changeHotspotType(e.value)} className='text-right' />
                    </span>
                    {rowData.type && (
                        <div className='flex flex-column gap-2' >
                            {(() => {
                                switch (rowData.type) {
                                    case 'INFO':
                                        return <>
                                            <InputTextarea autoResize value={rowData.info} onChange={(e) => changeHotspotInfo(e.value)} rows={5} cols={30} />
                                        </>;
                                    case 'QUESTION':
                                        return <>
                                            <span className="p-float-label">
                                                <label htmlFor="hotspotQuestion" className='relative mr-3'>כתוב שאלה</label>
                                                <InputText id='hotspotQuestion' value={rowData.question} onChange={(e) => changeHotspotQuestion(e.value)} />
                                            </span>
                                            <span className="p-float-label">
                                                <label htmlFor="hotspotOptions" className='relative mr-3' >מלא תשובות אפשריות</label>
                                                <Chips id='hotspotOptions' value={rowData.options} onChange={(e) => changeHotspotOptions(e.value)} />
                                            </span>
                                            <span className="p-float-label">
                                                <label htmlFor="hotspotAnswer" className='relative mr-3' >בחר תשובה נכונה</label>
                                                <Dropdown id='hotspotAnswer' value={rowData.answer} options={rowData.options} onChange={(e) => changeHotspotAnswer(e.value)} className='text-right' />
                                            </span>
                                        </>;
                                    case 'ACTION':
                                        return <div></div>;
                                    default:
                                        return null;
                                }
                            })()}
                        </div>
                    )}
                </div>
            </Card>

        );
    };
    return (
        <div className="card p-fluid" style={{ direction: "rtl" }}>
            <DataTable value={userSetHotspots} editMode="cell" stripedRows dataKey="id" size='small' expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate} columnResizeMode='fit' >
                <Column field='index' header='סידורי' body={(_, rowData) => `${rowData.rowIndex + 1}`} align={"center"} headerClassName='text-center' className='w-1' />
                <Column field="title" header="כותרת" align={"center"} editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete} className='w-4' ></Column>
                {exerciseType != 'DND' && (<Column expander className='w-1 text-center' style={{ transform: 'rotate(0.5turn)' }}></Column>)}
                <Column body={removeButtonTemplate} className='w-1 text-center'></Column>
            </DataTable>
        </div>
    );
}