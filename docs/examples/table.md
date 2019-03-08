---
id: creating-table
title: Creating a table
---

Use the Table Component from the [SSENSE component library](https://github.com/Groupe-Atallah/ui-internal-components-react) to create a table.

At the top of your file, include:

```js
import Table from '@ssense/ui-component-library/lib/components/Table/Table';
```

Use the following snippet as a template:

```js
<Table
    tableHead={['Name', 'Country', 'City', 'Salary']}
    tableData={[
        ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
        { total: true, colspan: '2', value: '$200,000' },
    ]}
    customCellClasses={[
        props.classes.right,
    ]}
    customClassesForCells={[3]}
    customHeadCellClasses={[
        props.classes.right,
    ]}
    customHeadClassesForCells={[3]} />
```

The `tableHead` property is optional.

It is recommended to nest your Table component inside a `<CardBody>` component as such:

```js
<Card>
    <CardBody>
        <Table>
            ...
        </Table>
    </CardBody>
</Card>
```

You may also use the default `TableIcon` component for visual landmarking by wrapping it inside the `CardHeader`'s `CardIcon` Component as such: 

```js
<CardHeader color="info" icon>
    <CardIcon color="info">
        <TableIcon/>
    </CardIcon>
    <h4 className={props.classes.cardIconTitle}>
        Simple Table &nbsp;<small>- Simplest table</small>
    </h4>
</CardHeader>
```