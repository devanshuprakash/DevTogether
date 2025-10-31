import React, { useEffect, useRef } from "react";
import { EditorView } from "codemirror";
import { lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { closeBrackets } from "@codemirror/autocomplete";
import { dracula } from "@uiw/codemirror-theme-dracula";

const Editor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const updateListener = EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        const doc = v.state.doc.toString();
        if (onChange) onChange(doc);
      }
    });

    viewRef.current = new EditorView({
      doc: value,
      extensions: [
        lineNumbers(),
        javascript(),
        html(),
        closeBrackets(),
        dracula,
        updateListener,
      ],
      parent: editorRef.current,
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div id="realtimeEditor" ref={editorRef}></div>;
};

export default Editor;
