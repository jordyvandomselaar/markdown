import React, {useEffect, useState} from 'react';
import '@rmwc/data-table/data-table.css';

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

const getDocuments = (items, deleteDocument) => {
  return (
    Object.keys(items).map(id => {
      const document = items[id];

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

  return (
    <div>
      <div>
        <Fab icon="add" label="New Document" onClick={() => history.push('/documents/new')}/>
      </div>
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>Document</DataTableHeadCell>
              <DataTableHeadCell>Labels</DataTableHeadCell>
              <DataTableHeadCell>Actions</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {getDocuments(documents, deleteDocument)}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </div>
  );
};

export default DocumentOverview;
