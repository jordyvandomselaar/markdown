import React, {useState} from 'react';

import {Elevation} from 'rmwc/Elevation';
import {Typography} from 'rmwc/Typography';
import {TextField} from 'rmwc/TextField';
import {Button} from 'rmwc/Button';
import LabelEditor from '../LabelEditor';

const store = async (data, history, storeDocument, labels) => {
  const newDocument = await storeDocument(data, labels);

  return history.push(`/documents/${newDocument.id}`);
};

const NewDocument = ({history, storeDocument}) => {
  const [formData, setFormData] = useState({});
  const [labels, setLabels] = useState([]);
  const updateLabels = labels => {
    // De-duplicate labels
    setLabels([...new Set(labels)]);
  };

  return (
    <div>
      <Elevation z={0}>
        <Typography use="headline1">New document</Typography>
        <TextField label="Document name" fullwidth onChange={e => setFormData({...formData, name: e.target.value})}/>
        <LabelEditor labels={labels} onChange={label => updateLabels([...labels, label])}/>
        <Button raised onClick={() => store(formData, history, storeDocument, labels)}>Save</Button>
      </Elevation>
    </div>
  );
};

export default NewDocument;
