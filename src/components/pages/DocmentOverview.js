import React, {useEffect, useState} from 'react';
import MarkdownLogo from '../../assets/Markdown-mark.svg.png';
import styled from 'styled-components';

import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle,
} from 'rmwc/GridList';

import {Icon} from 'rmwc/Icon';

import {Link} from 'react-router-dom';


const StyledIcon = styled(Icon)`
  font-size: 10rem;
  text-align: center;
`;

const StyledGridIcon = styled(GridTileIcon)`
  right: 16px;
`;

const getDocuments = (items, deleteDocument) => {
  return (
    Object.keys(items).map(id => {
      const document = items[id];

      return (
        <GridTile key={id}>
          <Link to={`/document/${id}`}>
            <GridTilePrimary>
              <GridTilePrimaryContent>
                <img src={MarkdownLogo} alt="Markdown logo"/>
              </GridTilePrimaryContent>
            </GridTilePrimary>
            <GridTileSecondary>
              <GridTileTitle>
                {document.name}
              </GridTileTitle>
              <StyledGridIcon
                icon="delete" onClick={e => {
                e.preventDefault();
                deleteDocument(id);
              }}
              />
            </GridTileSecondary>
          </Link>
        </GridTile>
      );
    })
  );
};

const NewDocumentTile = () => {
  return (
    <GridTile>
      <Link to={`/document/new`}>
        <GridTilePrimary>
          <GridTilePrimaryContent>
            <StyledIcon icon="add"/>
          </GridTilePrimaryContent>
        </GridTilePrimary>
        <GridTileSecondary>
          <GridTileTitle>
            New document
          </GridTileTitle>
        </GridTileSecondary>
      </Link>
    </GridTile>
  );
};

const DocumentOverview = ({fetchDocuments, deleteDocument: deleteFirestoreDocument}) => {
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
      <GridList>
        <NewDocumentTile/>
        {getDocuments(documents, deleteDocument)}
      </GridList>
    </div>
  );
};

export default DocumentOverview;
