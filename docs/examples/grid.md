---
id: using-grid
title: Using the grid
---

Use the [Material UI Grid Component](https://material-ui.com/layout/grid/) Grid component for your layout base.

At the top of your file, include:

```js
import Grid from '@material-ui/core/Grid';
```

Use the following snippet as a template:

```js
<Grid container>
    <Grid item xs={12}>
        ...
    </Grid>
    <Grid item xs={6}>
        ...
    </Grid>
    <Grid item xs={6}>
        ...
    </Grid>
</Grid>
```

The `<Grid item>` must be nested inside a `<Grid container>`.