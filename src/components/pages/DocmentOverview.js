import React, {useEffect, useState} from 'react';
import '@rmwc/data-table/data-table.css';
import styled from 'styled-components';
import {Icon} from 'rmwc/Icon';
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
import Centered from '../styled/Centered';
import PageTitle from '../PageTitle';

import {ToolbarTitle} from 'rmwc/Toolbar';

const StyledDataTable = styled(DataTable)`
  width: 100%;
`;

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const NewDocumentWrapper = styled.div`
  margin: 20px 0;
`;

const DocumentOverview = ({history, fetchDocuments, deleteDocument: deleteFirestoreDocument}) => {
  const [documents, setDocuments] = useState({});

  useEffect(async () => {
    const documents = await fetchDocuments();

    setDocuments(documents);
  }, []);

  const deleteDocument = id => {
    deleteFirestoreDocument(id);

    const newDocuments = documents;
    delete newDocuments[id];
    setDocuments(newDocuments);
  };

  const getDocuments = () => {
    return (
      Object.keys(documents).map(id => {
        const document = documents[id];

        return (
          <DataTableRow key={id}>
            <DataTableCell><Link to={`/documents/${id}`}>{document.name}</Link></DataTableCell>
            <DataTableCell><LabelEditor labels={document.labels}/></DataTableCell>
            <DataTableCell>
              <Icon
                icon="delete" onClick={e => {
                e.preventDefault();
                deleteDocument(id);
              }}
              />
            </DataTableCell>
          </DataTableRow>
        );
      })
    );
  };

  return (
    <>
      <PageTitle>
        <ToolbarTitle>Document Overview</ToolbarTitle>
      </PageTitle>
      <div>
        <Centered>
          <NewDocumentWrapper>
            <Fab icon="add" label="New Document" onClick={() => history.push('/documents/new')}/>
          </NewDocumentWrapper>
        </Centered>
        <StyledDataTable>
          <StyledDataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Document</DataTableHeadCell>
                <DataTableHeadCell>Labels</DataTableHeadCell>
                <DataTableHeadCell>Actions</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {getDocuments()}
            </DataTableBody>
          </StyledDataTableContent>
        </StyledDataTable>
      </div>
    </>
  );
};

export default DocumentOverview;
