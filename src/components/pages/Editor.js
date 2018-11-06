import React, {useEffect, useState} from 'react';
import AceEditor from 'react-ace';
import {Typography} from 'rmwc/Typography';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/github';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Editor = ({match, findDocument, updateDocument}) => {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const id = match.params.id;

    const document = await findDocument(id);

    setDocument(document.data() || '');

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    updateDocument(match.params.id, {markdown: document.markdown});
  }, [document]);

  return (
    <Wrapper>
      <Typography use="headline1">{document.name}</Typography>

      <AceEditor
        mode="markdown"
        theme="github"
        onChange={markdown => setDocument({...document, markdown})}
        name="markdown-editor"
        editorProps={{$blockScrolling: true}}
        value={document.markdown}
        style={{
          height: '100%',
          width: '100%',
        }}
        fontSize={18}
      />
    </Wrapper>
  );
};

export default Editor;
