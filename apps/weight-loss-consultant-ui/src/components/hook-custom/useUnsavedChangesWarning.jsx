import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
const useUnsavedChangesWarning = (
  message = 'Are you sure want to discard changes?'
) => {
  const [isShow, setShowPrompt] = useState(false);

  useEffect(() => {
    window.onbeforeunload = isShow && (() => message);

    return () => {
      window.onbeforeunload = null;
    };
  }, [isShow, message]);

  const routerPrompt = <Prompt when={isShow} message={message} />;

  return [routerPrompt, () => setShowPrompt(true), () => setShowPrompt(false)];
};

export default useUnsavedChangesWarning;
