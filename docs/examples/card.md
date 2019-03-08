---
id: using-card
title: Using the Card Component
---

Use the Card Component from the [SSENSE component library](https://github.com/Groupe-Atallah/ui-internal-components-react) to create a table.

At the top of your file, include:

```js
import Grid from '@material-ui/core/Grid';
```

Use the following snippet as a template:

```js
<Card>
    <CardHeader color="success" icon>
        <CardIcon>
            ...
        </CardIcon>
        ...
    </CardHeader>
    <CardBody>
        ...
    </CardBody>
    <CardFooter>
        ...
    </CardFooter>
</Grid>
```

The `<Grid item>` must be nested inside a `<Grid container>`.