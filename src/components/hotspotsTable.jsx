import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


export default function HotspotsTable(userSetHotspots, setUserSetHotspots) {
    const onRowEditComplete = (e) => {
        let _userSetHotspots = [...userSetHotspots];
        let { newData, index } = e;

        _userSetHotspots[index] = newData;

        setUserSetHotspots(_userSetHotspots);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const removeHotspot=(id)=>{
        let _newArray= userSetHotspots.filter(f=>f.id!=id)
        setUserSetHotspots(_newArray)
    }
    const removeButtonTemplate= (rowData)=>{
        return <Button icon="pi pi-times" severity="danger" onClick={() =>removeHotspot(rowData.id)}></Button>
    }

    return (
        <div className="card p-fluid" style={{direction:"rtl"}}>
            <DataTable value={userSetHotspots} editMode="row" stripedRows dataKey="id" onRowEditComplete={onRowEditComplete}  tableStyle={{ minWidth: '50rem' }} >
                <Column field="id" header="id" align={"center"} style={{ width: '20%' }}></Column>
                <Column field="title" header="כותרת" align={"center"} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="question" header="שאלה" align={"center"} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                {/* <Column field="options" header="id" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column> */}
                <Column field="answer" header="תשובה" align={"center"} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="dataSurface" header="קורדינטות" align={"center"} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={removeButtonTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}