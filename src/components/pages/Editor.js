import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToolbarTitle } from "rmwc/Toolbar";
import PageTitle from "../PageTitle";
import LabelEditor from "../LabelEditor";
import FlexHorizontal from "../styled/FlexHorizontal";
import MarkdownEditor from "../MarkdownEditor";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Editor = ({ match, findDocument, updateDocument }) => {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const id = match.params.id;

    const document = await findDocument(id);

    setDocument(document.data() || "");

    setLoading(false);
  }, []);

  useEffect(
    () => {
      if (loading) {
        return;
      }

      updateDocument(match.params.id, { markdown: document.markdown });
    },
    [document]
  );

  return (
    <Wrapper>
      <PageTitle>
        <FlexHorizontal>
          <ToolbarTitle>{document.name}</ToolbarTitle>
          <LabelEditor labels={document.labels} />
        </FlexHorizontal>
      </PageTitle>

      {!loading && (
        <MarkdownEditor
          onMarkdownChange={markdown => setDocument({ ...document, markdown })}
          name="markdown-editor"
          editorProps={{ $blockScrolling: true }}
          initialMarkdown={document.markdown}
        />
      )}
    </Wrapper>
  );
};

export default Editor;
