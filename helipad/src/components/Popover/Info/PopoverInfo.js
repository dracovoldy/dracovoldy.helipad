import React, { useState, useLayoutEffect } from 'react';

import { FlexBox, FlexBoxDirection, Popover, PopoverPlacementType, Title } from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import helipadStore from '../../../store/helipadStore';

const PopoverInfo = ({ popoverRef, placementType = PopoverPlacementType.Bottom, title, ...props }) => {

  const [state, setState] = useState(helipadStore.initialState);
  useLayoutEffect(() => {
    helipadStore.subscribe(setState);
    helipadStore.init();
  }, []);

  return (
    <Popover data-testid="popoverInfo-wrapper" ref={popoverRef} placementType={placementType}
      onBeforeClose={() => {
        state.shell.profile = false;
        helipadStore.sendMessage(state);
      }}
      onBeforeOpen={() => {
        state.shell.profile = true;
        helipadStore.sendMessage(state);
      }}
    >
      <FlexBox direction={FlexBoxDirection.Column}>
        <div className="popover-header">
          {title && (
            <Title data-testid="popoverInfo-title-wrapper" style={spacing.sapUiContentPadding}>
              {title}
            </Title>
          )}
        </div>
        <div className="popover-content">{props.children}</div>
      </FlexBox>
    </Popover>
  );
};

export default PopoverInfo;
