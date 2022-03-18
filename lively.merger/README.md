# lively.merger

This packages implements merging of [morphs](../lively.morphic/) with common ancestry, utilizing a 3-way-merge.

## Entry Points

The main entry point is the [merger](./merger.js). Here, the different functionality for merging morphs is described.
To merge the morphs, we extract their properties using the `propertiesAndPropertySettings()` method. These can then be handled as normal objects and passed into the [3-way-merger](./3-way-merger.js). The resulting merged properties are then either used to create a new, merged morph, or applied to one of the input morphs to allow 'merge into' functionality

## Custom Merging

To allow programmers to implement their own merge strategies, we added the `__provideMergeStrategy__` method. If this is implemented for an object that is about to be merged, this method is used instead of the standard merge algorithm.

This allows for customization where the general purpose merge might ignore semantics. Colors for example are a collection of color channel values. If a general purpose merge would be applied, the colors themselves would not be merged, but their values, which would result in a mixed color and not the color of one of the versions.

## World Merging

As worlds in lively.next are also just morphs, they can also be merged. Corresponding hooks are set when saving worlds. However, there are still some limitations that may lead to unexpected behavior.

- Worlds will only be merged when they are saved and there is a conflict with the version in the database. Here several ways of proceeding can be selected.
- System tools like browsers, inspectors, etc. should not be merged. Accordingly, we excluded them from merging.
- Worlds themselves should not be merged. Accordingly, the submorphs of worlds are merged and used to create a new world with them in it. This new world is then written back to the database as a new commit.

## Open ToDos:

- Customize the DerivationID lists ()
- Better UI for manual merging (#11)
- Merging for objects (#46)