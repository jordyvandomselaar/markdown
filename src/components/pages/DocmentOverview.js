import React from 'react';
import '@rmwc/data-table/data-table.css';
import styled from 'styled-components';
import {IconButton} from 'rmwc/IconButton';
import {Fab} from 'rmwc/Fab';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow,
} from 'rmwc/DataTable';
import {Link} from 'react-router-dom';
import LabelEditor from '../LabelEditor';
import PageTitle from '../PageTitle';
import {Grid, GridCell} from 'rmwc/Grid';
import {ToolbarTitle} from 'rmwc/Toolbar';
import {Typography} from 'rmwc/Typography';
import {TextField} from 'rmwc/TextField';

const StyledDataTable = styled(DataTable)`
  width: 100%;
`;

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const OpenDocumentButton = styled(Link)`
  text-decoration: none;
`;

const DocumentOverview = ({ history, documents, deleteDocument, search }) => {
  const getDocuments = () => {
    return Object.keys(documents).map(id => {
      const document = documents[id];

      return (
        <DataTableRow key={id}>
          <DataTableCell>
            <OpenDocumentButton to={`/documents/${id}`}>
              <Typography use="body1">{document.name}</Typography>
            </OpenDocumentButton>
          </DataTableCell>
          <DataTableCell>
            <LabelEditor labels={document.labels} />
          </DataTableCell>
          <DataTableCell>
            <IconButton
              icon="delete"
              onClick={e => {
                e.preventDefault();
                deleteDocument(id);
              }}
            />
          </DataTableCell>
        </DataTableRow>
      );
    });
  };

  return (
    <>
      <PageTitle>
        <ToolbarTitle>Document Overview</ToolbarTitle>
      </PageTitle>
      <Grid>
        <GridCell span={12}>
          <Fab
            icon="add"
            label="New Document"
            onClick={() => history.push("/documents/new")}
          />
          <TextField
            withLeadingIcon="search"
            withTrailingIcon="close"
            label="Search"
            outlined={true}
            onChange={e => search(e.target.value)}
          />
        </GridCell>
        <GridCell span={12}>
          <StyledDataTable>
            <StyledDataTableContent>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeadCell>
                    <Typography use="body1">Document</Typography>
                  </DataTableHeadCell>
                  <DataTableHeadCell>
                    <Typography use="body1">Labels</Typography>
                  </DataTableHeadCell>
                  <DataTableHeadCell>
                    <Typography use="body1">Actions</Typography>
                  </DataTableHeadCell>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>{getDocuments()}</DataTableBody>
            </StyledDataTableContent>
          </StyledDataTable>
        </GridCell>
      </Grid>
    </>
  );
};

export default DocumentOverview;
