# Make API Angular

## Install

```
bower install makeapi-angular
```

## Setup

1. Add makerstap in your head `<link rel="stylsheet" href="bower_components/makerstrap/dist/makerstrap.complete.min.css"`. There are other ways to do this -- see the makerstrap docs.
2. Make sure `angular.js`, `makeapi-client.js`, `makeapi-angular.js` and `makapi-angular.templates.js` are all added to your document.
3. Add the `wmMakeApiAngular` module to your angular app.

## Directives

### Make

To create an individal make, just add a `make` element with a `make-id` attribute.

```html
<make make-id="539f56c3522cf67163000154"></make>
```

### Make-Gallery

To create a gallery of makes, use a `make-gallery` element (or attribute):

```html
<make-gallery
  tags="['puppy']"
  container-class="col-sm-3">
</make-gallery>
```

Make galleries have the following optional attributes:

* `limit` [number] - This max number of makes. The default is 20.
* `tags` [array] - An array of tags
* `ids` [array] - An array of ids
* `makeList` [string] - An id of a [makeList](http://mozilla.github.io/makeapi-docs/client-docs/#get-list)
* `container-class` [string] - Classes to be added to each make's container element

## Service

Included in this module is the `makeApi` service.

You should use it just like the normal [Make API client](http://mozilla.github.io/makeapi-docs/client-docs), except instead of using the final function `.then()`, use `.get()` instead.

`.get()` returns a promise that can be resolved just like `$http`'s `get`, i.e. with the functions `.success()` and `.error()`:

### Example

```js
  makeApi
    .tags(['puppy'])
    .limit(10)
    .get()
    .success(data) {
      console.log(data);
    })
    .error(err) {
      console.error(err);
    });
```


## Todo

[ ] Pagination
