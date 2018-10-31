import React, {useEffect, useState} from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/github';
import {find, update} from '../../Repositories/DocumentRepository';

const MarkdownEditor = ({match}) => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const id = match.params.id;

    const document = await find(id);

    setMarkdown(document.markdown || '');

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    update(match.params.id, {markdown});
  }, [markdown]);

  return (
    <AceEditor
      mode="markdown"
      theme="github"
      onChange={setMarkdown}
      name="markdown-editor"
      editorProps={{$blockScrolling: true}}
      value={markdown}
      style={{
        height: '100%',
        width: '100%',
      }}
      fontSize={18}
    />
  );
};

export default MarkdownEditor;
