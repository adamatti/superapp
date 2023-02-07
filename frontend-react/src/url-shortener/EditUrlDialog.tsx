import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { classNames } from 'primereact/utils';
import { type Url } from './types';
import { Button } from 'primereact/button';

interface EditUrlDialogParams {
  url: Url | null;
  visible: boolean;
  onHide: () => void;
  onSave: (url: Url) => void;
}

// TODO url mask (e.g. accept only valid urls)
function NewUrlDialog(params: EditUrlDialogParams) {
  const defaultUrl: Url = params.url ?? { id: 0, url: '', keys: [] };
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [url, setUrl] = useState<Url>(defaultUrl);

  const footer = () => {
    return (
      <>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onHide} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onSave} />
      </>
    );
  };

  const isUrlValid = (): boolean => {
    return !!url.url && Array.isArray(url.keys) && url.keys.length > 0;
  };

  const onHide = () => {
    setUrl(defaultUrl);
    setSubmitted(false);
    params.onHide();
  };

  const onSave = () => {
    setSubmitted(true);
    if (isUrlValid()) {
      params.onSave(url);
    } else {
      console.warn('Url not valid', url);
    }
  };

  const onInputChange = (e: any, name: keyof Url) => {
    const val: string = e.target?.value || '';
    const _url: any = { ...url };

    if (name === 'keys') {
      _url.keys = val.split(',').map((i) => i.trim());
    } else {
      _url[name] = val;
    }

    setUrl(_url);
  };

  const toString = (val: any): string => {
    if (Array.isArray(val)) {
      return val?.filter((i) => i)?.join(', ') || '';
    }
    return `${val ?? ''}`;
  };

  const field = (fieldName: keyof Url, label: string, required: boolean) => {
    const error =
      submitted &&
      required &&
      (fieldName === 'keys' ? !Array.isArray(url.keys) || url.keys.length === 0 : !url[fieldName]);

    return (
      <div className="field">
        <label htmlFor={fieldName}>{label}</label>
        <InputText
          id={fieldName}
          value={toString(url[fieldName])}
          onChange={(e) => {
            onInputChange(e, fieldName);
          }}
          required
          autoFocus
          className={classNames({ 'p-invalid': error })}
        />
        {error && <small className="p-error">{label} is required.</small>}
      </div>
    );
  };

  return (
    <Dialog
      visible={params.visible}
      footer={footer}
      onHide={params.onHide}
      style={{ width: '450px' }}
      modal
      className="p-fluid"
      header="Url Details"
    >
      {field('title', 'Title', false)}
      {field('description', 'Description', false)}
      {field('url', 'URL', true)}
      {field('keys', 'Keys', true)}
    </Dialog>
  );
}

export default NewUrlDialog;
