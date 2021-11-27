import React from 'react';
import { isPhone } from '@ui5/webcomponents-base/dist/Device.js';

const style = {
  centered: {
    display: 'flex',
    margin: '0 auto',
    minWidth: isPhone() ? '100%' : '80%',
  },
};

const CenteredContent = (props) => {
  return (
    <div id="z-content-area" data-testid="centered-content" style={style.centered} {...props}>
      {props.children}
    </div>
  );
};

export default CenteredContent;
