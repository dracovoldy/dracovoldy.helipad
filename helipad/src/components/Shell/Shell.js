import React, { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import helipadStore from '../../store/helipadStore';
import { Avatar, AvatarShape, ShellBar } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/customer.js';
import PopoverListItems from '../Popover/List/PopoverListItems';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import { ROUTES } from '../../routes/Routes';

const style = {
  shell: {
    position: 'fixed',
    width: '100%',
    zIndex: 100,
  },
  emptySpace: {
    paddingTop: '44px',
  },
};

const Shell = ({ title, ...props }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const popoverConfigItemsRef = useRef(null);
  const popoverItems = useMemo(
    () => [
      {
        description: t('shell.button.user.settings.item.languageSwitch'),
        icon: 'user-settings',
        children: <LanguageSwitch />,
      },
      {
        description: t('shell.button.user.settings.item.themeSwitch'),
        icon: 'customize',
        children: <ThemeSwitch />,
      },
    ],
    [t],
  );
  const [state, setState] = useState(helipadStore.initialState);
  useLayoutEffect(() => {
    helipadStore.subscribe(setState);
    helipadStore.init();
  }, []);

  const openPopover = (e) => {
    if (!state.shell.profile) {
      popoverConfigItemsRef.current.showAt(e.detail.targetRef);
      return;
    }
  }
  const closePopover = (e) => {
    popoverConfigItemsRef.current.close();
  }

  return (
    <>
      <ShellBar
        data-testid="shell-wrapper"
        primaryTitle={title}
        secondaryTitle={title}
        style={style.shell}
        logo={<img alt={t('shell.logo.alt')} src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg" />}
        onLogoClick={() => history.push(ROUTES.HOME)}
        profile={<Avatar icon="customer" shape={AvatarShape.Circle} />}
        onProfileClick={!state.shell.profile ? openPopover : closePopover}
        {...props}
      />
      <div data-testid="emptySpace-wrapper" style={style.emptySpace} />
      <PopoverListItems popoverRef={popoverConfigItemsRef} title={t('shell.button.user.settings')} items={popoverItems} />
    </>
  );
};

export default Shell;
