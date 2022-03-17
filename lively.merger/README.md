# lively.merger

## Entry Point

The entry point is the merger class. In this the different functionality for merging morphs is described.
This falls back on the 3-way-merge class. In this the actual merge happens on object level.
For a 3-way-merge we need 3 objects. These are compared on the basis of their keys. To merge morphs we use the propertiesAndPropertySettings method.
So we merge only the properties of the morphs and then merge them to a new morph or overwrite the properties at one of the original morphs.

## Custom Merging

To make it easier for programmers to implement their own merge strategies there is the __provideMergeStrategy__ method. If this is implemented for an object which should be merged, this method is used instead of the standard merge algorithm.
Over it programmers can decide very freely how exactly custom objects are to be merged, of course the 3-way-merge method is nevertheless available. Thus one can adapt also afterwards individual characteristics.

## World Merging

In addition worlds can be merged, these are in lively.next also only morphs and should therefore function automatically, however one must consider some things here.
System tools like a browser, inspector, version manager, hand, ... should not be merged. Therefore we exclude these when merging worlds. Also the world itself should not be merged but only the submorphs of the world. After that, a new world should be created containing the merged submorphs and written to the database as a new commit. Alternatively, you can choose other strategies when merging worlds, such as simply overwriting your own or other people's changes.

## Open ToDos:

Customize the DerivationID lists
Better Merge Conflict UI
Merging for objects
