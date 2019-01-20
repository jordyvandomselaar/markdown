import React from "react";
import styled from "styled-components";
import { IconButton } from "@rmwc/icon-button";
import { Fab } from "@rmwc/fab";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow
} from "@rmwc/data-table";
import { Link } from "react-router-dom";
import LabelEditor from "../LabelEditor";
import PageTitle from "../PageTitle";
import { Grid, GridCell } from "@rmwc/grid";
import { ToolbarTitle } from "@rmwc/toolbar";
import { Typography } from "@rmwc/typography";
import { TextField } from "@rmwc/textfield";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import "@rmwc/data-table/data-table.css";
import Centered from "../styled/Centered";
import "@material/elevation/dist/mdc.elevation.css";
import { Elevation } from "@rmwc/elevation";

const StyledDataTable = styled(DataTable)`
  width: 100%;
  border: none !important;
`;

const StyledDataTableContent = styled(DataTableContent)`
  width: 100%;
`;

const OpenDocumentButton = styled(Link)`
  text-decoration: none;
`;

const DocumentOverview = ({
  history,
  documents,
  deleteDocument,
  search,
  shareDocument
}) => {
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
            <IconButton
              icon="delete"
              onClick={e => {
                e.preventDefault();
                deleteDocument(id);
              }}
            />
            <IconButton
              icon="share"
              onClick={e => {
                e.preventDefault();
                shareDocument(id);
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
        <GridCell span={11}>
          <TextField
            label="Search"
            onChange={e => search(e.target.value)}
            fullwidth
          />
        </GridCell>
        <GridCell span={1}>
          <Fab icon="add" onClick={() => history.push("/documents/new")} />
        </GridCell>
        <GridCell span={12}>
          <Elevation z={1}>
            <StyledDataTable>
              <StyledDataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>
                      <Typography use="body1">Document</Typography>
                    </DataTableHeadCell>
                    <DataTableHeadCell>
                      <Typography use="body1">Actions</Typography>
                    </DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>{getDocuments()}</DataTableBody>
              </StyledDataTableContent>
            </StyledDataTable>
          </Elevation>
        </GridCell>
      </Grid>
    </>
  );
};

export default DocumentOverview;
