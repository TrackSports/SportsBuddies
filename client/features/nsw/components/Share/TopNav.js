import React, { PropTypes } from 'react';
import classnames from 'classnames';
import dscss from './document.scss';
import Image from 'share/Image';

const TopNav = (props) => {
  return (
    <div className={classnames(dscss.topNavMain)}>
          <div className="row">
              <div className={classnames('col-xs-6')} style= {{ paddingLeft: '133px' }}>
                <a><Image src="/Toolbar/logo.png" className={classnames(dscss.toolbarFlexItLogo)} /></a>
                <span className={classnames(dscss.topNavUl, props.eCOSAccessUrl ? '' : 'hidden')}>
                    <ul>
                        <li><a href={props.eCOSAccessUrl}>eCOS</a></li>
                    </ul>
                </span>
              </div>
              <div className={classnames('col-xs-6')} style= {{ width: '44.6%', textAlign: 'right' }}>
                <a><Image src="/Toolbar/infotrackLogo.png" className={classnames(dscss.toolbarInfoTrack)} /></a>
              </div>
          </div>
    </div>
  );
};

TopNav.propTypes = {
  eCOSAccessUrl: PropTypes.string
};

export default TopNav;
