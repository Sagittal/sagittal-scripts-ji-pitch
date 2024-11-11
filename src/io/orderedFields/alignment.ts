import { Alignment, Column, Index, isArray, isUndefined, Maybe, TableAlignment } from "@sagittal/general"

const computeOrderedTableAlignment = (
    tableAlignment: TableAlignment,
    columnIndices: Index<Column>[],
): TableAlignment => {
    return isUndefined(tableAlignment)
        ? tableAlignment
        : isArray(tableAlignment)
          ? tableAlignment.map((_: Maybe<Alignment>, index: number): Maybe<Alignment> => {
                return (tableAlignment as Maybe<Alignment>[])[columnIndices[index]]
            })
          : tableAlignment
}

export { computeOrderedTableAlignment }
