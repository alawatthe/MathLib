/**
 * Returns all elements, which are in the first set, but not in the second.
 *
 * @param {Set} set The set whose elements should be removed from the current set.
 * @return {Set}
 */
without = Set.createSetOperation(true, false, false);