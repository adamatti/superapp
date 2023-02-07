import { DataTable, type DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../config';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { type ReactNode, useEffect, useState } from 'react';
import { type Url } from './types';
import DeleteDialog from './DeleteDialog';
import EditUrlDialog from './EditUrlDialog';

const baseUrl = `${config.backendAPI}/api/url-shortener/urls`;

// TODO select fields
// TODO add other fields (e.g. usage count, last usage, create date, update date)
function ListUrls() {
  const { getAccessTokenSilently } = useAuth0();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [url, setUrl] = useState<Url | null>(null);
  const [urls, setUrls] = useState<Url[]>([]);

  async function getToken() {
    return await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${config.auth0.domain}/api/v2/`,
        scope: 'read:current_user',
      },
    });
  }

  async function loadRows() {
    const authToken = await getToken();
    const response = await fetch(baseUrl, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    const rows = await response.json();
    setUrls(rows);
  }

  useEffect(() => {
    loadRows();
  }, []);

  /**
   * Call API, persist url
   */
  const saveUrl = async (url: Url): Promise<Url> => {
    const authToken = await getToken();
    const response = await fetch(`${baseUrl}/${url.id || ''}`, {
      method: url.id ? 'POST' : 'PUT',
      body: JSON.stringify(url),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
    });

    return await response.json();
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const { newData, index } = e;
    const entity = await saveUrl(newData as Url);
    const newUrls: Url[] = [...urls];
    newUrls[index] = entity;
    setUrls(newUrls);
  };

  const textEditor = (options: any) => {
    return (
      <InputText type="text" value={options.value || ''} onChange={(e) => options.editorCallback(e.target.value)} />
    );
  };

  const keysTemplate = (e: Url) => {
    return (
      <>
        {e.keys?.map((k: string) => (
          <Tag key={k} value={k} />
        ))}
      </>
    );
  };

  const keysEditor = (options: any): ReactNode => {
    return (
      <InputText
        type="text"
        value={options.value.join(', ') || ''}
        onChange={(e) => options.editorCallback(e.target.value.split(',').map((i) => i.trim()))}
      />
    );
  };

  /**
   * Open confirmation dialog
   */
  const confirmDelete = (url: Url) => {
    setUrl(url);
    setDeleteDialog(true);
  };

  const deleteBodyTemplate = (rowData: Url) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => {
          confirmDelete(rowData);
        }}
      />
    );
  };

  /**
   * Open edit dialog
   */
  const addNewHandler = () => {
    // old
    // const newItem: Url = {id:0, url: '', keys: []};
    // setUrls(old => [...old, newItem]);

    // New
    setUrl(null);
    setEditDialog(true);
  };

  /**
   * Effective delete the url
   */
  const deleteHandler = async () => {
    const authToken = await getToken();
    if (url?.id) {
      // only delete if it was persisted
      await fetch(`${baseUrl}/${url?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken}`,
        },
      });
    }
    setUrls((old) => old.filter((c) => c.id !== url?.id));
    setDeleteDialog(false);
    setUrl(null);
  };

  const editDialogHandler = async (url: Url): Promise<void> => {
    const entity = await saveUrl(url);

    const newUrls: Url[] = [...urls.filter((u) => u.id !== url.id), entity];
    setUrls(newUrls);

    setEditDialog(false);
    setUrl(null);
  };

  return (
    <>
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={addNewHandler} />
      {urls && (
        <DataTable
          value={urls}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
          dataKey="id"
          responsiveLayout="scroll"
          filterDisplay="row"
          stripedRows
          // sortMode="multiple"
          sortField="url"
        >
          <Column
            field="title"
            header="Title"
            filter
            sortable
            editor={(options) => textEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            field="description"
            header="Description"
            filter
            sortable
            editor={(options) => textEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            field="url"
            header="Url"
            filter
            sortable
            editor={(options) => textEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            field="keys"
            header="Keys"
            body={(options) => keysTemplate(options)}
            editor={(options) => keysEditor(options)}
            style={{ width: '20%' }}
          />
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
          <Column body={deleteBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      )}

      {url != null && (
        <DeleteDialog
          visible={deleteDialog}
          url={url}
          onHide={() => {
            setDeleteDialog(false);
            setUrl(null);
          }}
          onConfirm={deleteHandler}
        />
      )}

      {
        <EditUrlDialog
          visible={editDialog}
          url={url}
          onHide={() => {
            setEditDialog(false);
            setUrl(null);
          }}
          onSave={editDialogHandler}
        />
      }
    </>
  );
}

export default ListUrls;
