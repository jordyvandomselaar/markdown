import React from 'react';
import styled from 'styled-components';
import {ToolbarTitle} from '@rmwc/toolbar';
import PageTitle from '../PageTitle';
import LabelEditor from '../LabelEditor';
import FlexHorizontal from '../styled/FlexHorizontal';
import MarkdownEditor from '../MarkdownEditor';
import {Typography} from '@rmwc/typography';
import {TextField} from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Item = styled.td`
  text-align: right;
`;

const FlexItem = styled.div`
  flex: 1;
`;

const Editor = ({ match, document, updateDocument }) => {
  return (
    <Wrapper>
      <PageTitle>
        <FlexHorizontal>
          <ToolbarTitle>{document.name}</ToolbarTitle>
        </FlexHorizontal>
      </PageTitle>

      <table>
        <tbody>
          <tr>
            <Item>
              <Typography use="body1">Name:</Typography>
            </Item>
            <td>
              <TextField
                outlined
                value={document.name}
                onChange={e =>
                  updateDocument({ ...document, name: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <Item>
              <Typography use="body1">Labels:</Typography>
            </Item>
            <td>
              <LabelEditor labels={document.labels} />
            </td>
          </tr>
        </tbody>
      </table>

      <FlexItem>
        <MarkdownEditor
          onMarkdownChange={markdown =>
            updateDocument({ ...document, markdown })
          }
          name="markdown-editor"
          editorProps={{ $blockScrolling: true }}
          initialMarkdown={document.markdown}
        />
      </FlexItem>
    </Wrapper>
  );
};

export default Editor;
