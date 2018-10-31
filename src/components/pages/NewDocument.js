import React, {useState} from 'react';

import {Elevation} from 'rmwc/Elevation';
import {Typography} from 'rmwc/Typography';
import {TextField} from 'rmwc/TextField';
import {Button} from 'rmwc/Button';
import {store} from '../../Repositories/DocumentRepository';

const storeDocument = (data, history) => {
  const newDocument = store(data);

  return history.push(`/document/${newDocument.id}`);
};

const NewDocument = ({history}) => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <Elevation z={0}>
        <Typography use="headline1">New document</Typography>
        <TextField label="Document name" fullwidth onChange={e => setFormData({...formData, name: e.target.value})}/>
        <Button raised onClick={() => storeDocument(formData, history)}>Save</Button>
      </Elevation>
    </div>
  );
};

export default NewDocument;
