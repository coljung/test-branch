SSENSE's backend services UI Boilerplate

This repo should work as a starting point for any backend service project requiring a UI part.

## Getting Started

### Development

#### Running the project using [workspace](https://github.com/Groupe-Atallah/workspace):

First you must clone the project.
``` bash
$ make clone service=ui-boilerplate
```

You'll notice there are two services that are cloned. This is because the boilerplate's service defninition in the workspace's [`docker-compose.yml`](https://github.com/Groupe-Atallah/workspace/blob/28d4921eed91043379a27ab86f1ad9a4ba32d21c/docker-compose.yml#L866) includes a `depends-on` rule that ties it to the [component-library](https://github.com/Groupe-Atallah/ui-component-library). The purpose of this rule is to enable the boilerplate to hot reload when changes are made on the component library.

To bring up both services and make use of this feature, simply run:

```bash
$ docker-compose up ui-boilerplate
```

If you wish to build the ui-boilerplate without using the symlink, simply run: this:
```bash
$ docker-compose build --build-arg LIB_DIR=0 ui-boilerplate
$ docker-compose up ui-boilerplate
```

Upon successfully bringing up the boilerplate image as a container, the following line should be displayed:
```bash
ui-boilerplate_1                  | ℹ ｢wdm｣: Compiled successfully.
```
#### Running the project locally:
In order to run the project locally, simply run:
```bash
$ npm install
$ npm run start
```
_...and start writting some code._

## Technologies used

* React
* Webpack 4
* Docker
* Docker compose


