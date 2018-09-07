import i18n from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    logo: {
        'vertical-align': 'middle',
        'margin-top': '-5px',
        width: '104px',
        height: 'auto',
    },
    title: {
        display: 'inline-block',
        'margin-left': '3rem',
    },
});

const HeaderContent = props =>
    <Grid container spacing={24}>
        <Grid item xs={12}>
            <div className={props.classes.paper}>
                <a href="/">
                    <img src="//res.cloudinary.com/ssenseweb/image/upload/v1471963917/web/ssense_logo_v2.svg" alt="SSENSE"
                         className={props.classes.logo}>
                    </img>
                </a>
                <Typography variant="display2" color="textPrimary" className={props.classes.title}>
                    {i18n.t('appTitle')}
                </Typography>
            </div>
        </Grid>
    </Grid>;

HeaderContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderContent);
