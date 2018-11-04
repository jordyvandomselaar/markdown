import React, {useEffect, useState} from 'react';
import MarkdownLogo from './Markdown-mark.svg.png';
import styled from 'styled-components';

import {
  GridList,
  GridTile,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle,
} from 'rmwc/GridList';

import {Icon} from 'rmwc/Icon';

import {Link} from 'react-router-dom';

const getDocuments = items => {
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
            </GridTileSecondary>
          </Link>
        </GridTile>
      );
    })
  );
};

const StyledIcon = styled(Icon)`
  font-size: 10rem;
  text-align: center;
`;

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

const DocumentOverview = ({fetchDocuments}) => {
  const [documents, setDocuments] = useState({});

  useEffect(async () => {
    const documents = await fetchDocuments();

    setDocuments(documents);
  }, []);

  return (
    <div>
      <GridList>
        <NewDocumentTile/>
        {getDocuments(documents)}
      </GridList>
    </div>
  );
};

export default DocumentOverview;
