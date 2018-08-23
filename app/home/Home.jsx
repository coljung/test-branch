import i18n from 'i18next';
import React from 'react';

export default () =>
    <div>
        <h1>{i18n.t('home.welcome')}</h1>
    </div>;
