import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { isDesktop, isTablet, isPhone } from '@ui5/webcomponents-base/dist/Device.js';
import Iframe from 'react-iframe-click';

import { Link, Text, Title, TitleLevel } from '@ui5/webcomponents-react';
import CenteredContent from '../../components/Layout/CenteredContent2';
import { ROUTES } from '../../routes/Routes';

const style = {
  iframe: {
    width: '100%',
    height: `calc( 100vh - 44px )`,
  },
};

const Container = () => {
  const history = useHistory();

  const handleClick = (frame) => {
    console.log(document.getElementById("root"))
    document.getElementById("root").click();
  }

  return (
    <CenteredContent>
      {/* <Helmet title="Helipad Home" /> */}
      <Iframe src="/appA.html" style={style.iframe} frameBorder={0} onInferredClick={handleClick}></Iframe>
    </CenteredContent>
  );
};

export default Container;
