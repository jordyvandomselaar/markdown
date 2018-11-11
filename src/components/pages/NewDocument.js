import React, {useState} from 'react';

import {Elevation} from 'rmwc/Elevation';
import {TextField} from 'rmwc/TextField';
import {Button} from 'rmwc/Button';
import LabelEditor from '../LabelEditor';
import PageTitle from '../PageTitle';
import {ToolbarTitle} from 'rmwc/Toolbar';

const NewDocument = ({history, storeDocument}) => {
    const [name, setName] = useState('');
    const [labels, setLabels] = useState([]);
    const updateLabels = labels => {
      // De-duplicate labels
      setLabels([...new Set(labels)]);
    };

    return (
      <>
        <PageTitle>
          <ToolbarTitle>New Document</ToolbarTitle>
        </PageTitle>
        <div>
          <Elevation z={0}>
            <TextField label="Document name" fullwidth value={name} onChange={e => setName(e.target.value)}/>
            <LabelEditor labels={labels} onChange={label => updateLabels([...labels, label])}/>
            <Button raised onClick={() => storeDocument(name, labels)}>Save</Button>
          </Elevation>
        </div>
      </>
    );
  }
;

export default NewDocument;
