import { type Url } from './types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface DeleteDialogParams {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    url: Url;
}

function DeleteDialog(params: DeleteDialogParams) {
    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={params.onHide} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={params.onConfirm} />
        </>
    );

    return (
        <Dialog
            visible={params.visible}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteDialogFooter}
            onHide={params.onHide}
        >
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {params.url && (
                    <span>
                        Are you sure you want to delete <b>{params.url.url}</b>?
                    </span>
                )}
            </div>
        </Dialog>
    );
}

export default DeleteDialog;
