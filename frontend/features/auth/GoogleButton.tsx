import React from 'react';

const GoogleButton: React.FC = () => {
  return (
    <div>
        <div id="g_id_onload"
            data-client_id="726797131514-gpuj32fjc3on3l0man3krslmp967nldq.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="auth"
            data-auto_prompt="false">
        </div>

        <div className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signup_with,"
            data-size="large"
            data-logo_alignment="left">
        </div>
    </div>
  );
};

export default GoogleButton;
