import React, { useEffect, useState } from "react";
import "@rmwc/data-table/data-table.css";
import styled from "styled-components";
import { IconButton } from "rmwc/IconButton";
import { Fab } from "rmwc/Fab";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow
} from "rmwc/DataTable";
import { Link } from "react-router-dom";
import LabelEditor from "../LabelEditor";
import Centered from "../styled/Centered";
import PageTitle from "../PageTitle";
import { Grid, GridCell } from "rmwc/Grid";
import { ToolbarTitle } from "rmwc/Toolbar";

const StyledDataTable = styled(DataTable)`
  width: 100%;
`;

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const DocumentOverview = ({
  history,
  fetchDocuments,
  deleteDocument: deleteFirestoreDocument
}) => {
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
    return Object.keys(documents).map(id => {
      const document = documents[id];

      return (
        <DataTableRow key={id}>
          <DataTableCell>
            <Link to={`/documents/${id}`}>{document.name}</Link>
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
          <Centered>
            <Fab
              icon="add"
              label="New Document"
              onClick={() => history.push("/documents/new")}
            />
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
              <DataTableBody>{getDocuments()}</DataTableBody>
            </StyledDataTableContent>
          </StyledDataTable>
        </GridCell>
      </Grid>
    </>
  );
};

export default DocumentOverview;
