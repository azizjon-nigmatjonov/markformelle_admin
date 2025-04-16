**Custom New Table "CNewTable" component**
## Multiple sellect logic
/**
 * Toggle selection of a group of rows:
 * - If all current rows are already selected, deselect them.
 * - If some/none are selected, add them to the selected list.
 *
 * Note:
 * - `bodySource` contains objects with a 1-based `index`, so we normalize it to 0-based.
 * - Ensures no duplicate indexes in selection.
 */