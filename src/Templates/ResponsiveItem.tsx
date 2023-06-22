//tsrafce

import React, { useEffect, useState } from "react";

type Props = {
  mobileSmallComponent?: React.FC;
  mobileComponent?: React.FC;
  tabletComponent?: React.FC;
  largeTableComponent?: React.FC;
  component: React.FC;
};

interface Screen {
  width: number;
  height?: number;
}

const ResponsiveItem = (props: Props) => {
  const [screen, setScreen] = useState<Screen>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const changeDevice = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("load", changeDevice);
    window.addEventListener("resize", changeDevice);

    return () => {
      window.removeEventListener("load", changeDevice);
      window.removeEventListener("resize", changeDevice);
    };
  }, []);

  let Component = props.component;
  if (screen.width < 375 && props.mobileSmallComponent) {
    Component = props.mobileSmallComponent;
  } else if (screen.width < 414 && props.mobileComponent) {
    Component = props.mobileComponent;
  } else if (screen.width < 768 && props.tabletComponent) {
    Component = props.tabletComponent;
  } else if (screen.width < 992 && props.largeTableComponent) {
    Component = props.largeTableComponent;
  } else if (screen.width >= 992 && props.component) {
    Component = props.component;
  }

  return <Component />;
};

export default ResponsiveItem;

//<ResponsiveItem component={Home} mobileComponent={HomeMobile} /> React.FC
//<ResponsiveItem component={<Home />} mobileComponent={<HomeMobile />} /> //JSX.element
