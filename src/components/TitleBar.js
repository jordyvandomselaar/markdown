import React from 'react';
import {Toolbar, ToolbarRow} from 'rmwc/Toolbar';

const TitleBar = ({children, containerRef}) => {
  return (
    <Toolbar>
      <ToolbarRow>
        <div ref={containerRef}>
          {children}
        </div>
      </ToolbarRow>
    </Toolbar>
  );
};

export default TitleBar;
