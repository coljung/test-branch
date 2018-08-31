import i18n from 'i18next';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Logo from './Logo';

export default () =>
    <div className="headerContent">
        <Logo />
        <Typography variant="title" color="inherit" noWrap>
            {i18n.t('appTitle')}
        </Typography>
    </div>;
