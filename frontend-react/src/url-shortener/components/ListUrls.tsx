import { DataTable, type DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { type ReactNode, useEffect, useState, useCallback } from 'react';
import { type Url } from '../types';
import DeleteDialog from './DeleteDialog';
import EditUrlDialog from './EditUrlDialog';
import { Link } from 'react-router-dom';
import useUrlHook from '../useUrlHook';
import { ProgressSpinner } from 'primereact/progressspinner';

// TODO select fields
// TODO add other fields (e.g. usage count, last usage, create date, update date)
function ListUrls() {
  const { listUrls, saveUrl, deleteUrl } = useUrlHook();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [url, setUrl] = useState<Url | null>(null);
  const [urls, setUrls] = useState<Url[]>([]);

  const loadRows = useCallback(async (): Promise<void> => {
    try {
      const rows = await listUrls();
      setUrls(rows);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [listUrls]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

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

  const urlTemplate = (e: Url) => {
    const size = 30;
    const value = e.url.length > size ? `${e.url.substring(0, size)}...` : e.url;
    return <Link to={e.url}>{value}</Link>;
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
    if (url?.id) {
      // only delete if it was persisted
      await deleteUrl(url.id);
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
      {isLoading && <ProgressSpinner />}
      {error && <Message severity="error" text="There was an error loading data" />}
      {!error && !isLoading && (
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
              <Column field="title" header="Title" filter sortable editor={textEditor} style={{ width: '20%' }} />
              <Column
                field="description"
                header="Description"
                filter
                sortable
                editor={textEditor}
                style={{ width: '20%' }}
              />
              <Column
                field="url"
                header="Url"
                filter
                sortable
                body={urlTemplate}
                editor={(options) => textEditor(options)}
                style={{ width: '20%' }}
              />
              <Column field="keys" header="Keys" body={keysTemplate} editor={keysEditor} style={{ width: '20%' }} />
              <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
              <Column body={deleteBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
          )}
        </>
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

      <EditUrlDialog
        visible={editDialog}
        url={url}
        onHide={() => {
          setEditDialog(false);
          setUrl(null);
        }}
        onSave={editDialogHandler}
      />
    </>
  );
}

export default ListUrls;
