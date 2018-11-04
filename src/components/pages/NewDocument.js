import React, {useState} from 'react';

import {Elevation} from 'rmwc/Elevation';
import {Typography} from 'rmwc/Typography';
import {TextField} from 'rmwc/TextField';
import {Button} from 'rmwc/Button';

const store = async (data, history, storeDocument) => {
  const newDocument = await storeDocument(data);

  return history.push(`/document/${newDocument.id}`);
};

const NewDocument = ({history, storeDocument}) => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <Elevation z={0}>
        <Typography use="headline1">New document</Typography>
        <TextField label="Document name" fullwidth onChange={e => setFormData({...formData, name: e.target.value})}/>
        <Button raised onClick={() => store(formData, history, storeDocument)}>Save</Button>
      </Elevation>
    </div>
  );
};

export default NewDocument;
