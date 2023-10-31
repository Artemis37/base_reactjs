import React from 'react';

const AppFooter = (props) => {
    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                {/* <img id="footer-logo" src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="atlantis-layout" />
                <span className="app-name">ATLANTIS</span> */}
                <img id='footer-logo' src="https://assets.website-files.com/5bd86c52b7abc5114b2ed43c/5bd8aad816e1ead4175ca869_Logo.png" alt="logo"></img>
            </div>
            <span className="copyright">&#169; Your Organization - 2023</span>
        </div>
    );
};

export default AppFooter;
