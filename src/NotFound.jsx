import React from 'react';
import i18n from 'i18next';

const NotFound = () => (
    <div>
        <h1>{i18n.t('404.title')}</h1>
        <p>{i18n.t('404.description')}</p>
    </div>
);

export default NotFound;
