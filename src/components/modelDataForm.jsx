import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
export const ModelDataForm = (modelData,setModelData) => {
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