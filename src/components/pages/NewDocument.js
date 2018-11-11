import React, { useState } from "react";

import { Elevation } from "rmwc/Elevation";
import { TextField } from "rmwc/TextField";
import { Button } from "rmwc/Button";
import LabelEditor from "../LabelEditor";
import PageTitle from "../PageTitle";
import { ToolbarTitle } from "rmwc/Toolbar";
import uniq from "lodash/uniq";
import { Grid, GridCell } from "rmwc/Grid";

const NewDocument = ({ history, storeDocument: firebaseStoreDocument }) => {
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([]);
  const updateLabels = labels => {
    setLabels(uniq(labels));
  };

  const storeDocument = (name, labels) => {
    if (!name) {
      return;
    }

    firebaseStoreDocument(name, labels);
  };

  return (
    <>
      <PageTitle>
        <ToolbarTitle>New Document</ToolbarTitle>
      </PageTitle>
      <Grid>
        <GridCell span={12}>
          <Elevation z={0}>
            <TextField
              label="Document name"
              fullwidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <LabelEditor
              labels={labels}
              onChange={label => updateLabels([...labels, label])}
            />
            <Button raised onClick={() => storeDocument(name, labels)}>
              Save
            </Button>
          </Elevation>
        </GridCell>
      </Grid>
    </>
  );
};
export default NewDocument;
