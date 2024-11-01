import { Filename, Io, program, setupScriptAndIo, ScaledVector } from "@sagittal/general"
import { FactoringMode } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../globals"
import { parsePitch } from "../../io"
import { JiPitchScriptGroupField } from "../../types"
import { parseExclusive, parseFields, parseSortBy } from "./parse"

// TODO: CASE-INSENSITIVE SORT BY (allow me to `--sort-by ATE`, please)

const applySharedJiPitchScriptSetup = (logDir?: Filename): void => {
    program
        .option(
            "--lower-bound <lowerBound>",
            "lower bound",
            (pitchIo: string): ScaledVector => parsePitch(pitchIo as Io),
        )
        .option(
            "--upper-bound <upperBound>",
            "upper bound",
            (pitchIo: string): ScaledVector => parsePitch(pitchIo as Io),
        )
        .option("--exclusive [exclusive]", "exclusive bounds", parseExclusive)
        .option("--max-aas <maxAas>", "max AAS", parseFloat)
        .option("--max-ate <maxAte>", "max ATE", parseInt)
        .option("--max-prime-limit <maxPrimeLimit>", "max prime limit", parseInt)
        .option("--max-2-3-free-sopfr <max23FreeSopfr>", "max 2,3-free sopfr", parseInt)
        .option("--max-2-3-free-copfr <max23FreeCopfr>", "max 2,3-free copfr", parseInt)
        .option("--max-n2d3p9 <maxN2d3p9>", "max n2d3p9", parseFloat)
        .option("--sort-by <sortBy>", "sort by", parseSortBy)
        .option("--undirected", "undirected comma name")
        .option("--factoring-mode <factoringMode>", "factoring mode (always, never, or threshold)")
        .option("--unabbreviated", "unabbreviated comma name")
        .option("--ascii", "ascii comma name")
        .option(
            "--excluded-fields <excludedFields>",
            "exclude fields",
            (excludedFieldsIo: string): JiPitchScriptGroupField[] =>
                parseFields(excludedFieldsIo as Io),
        )
        .option(
            "--ordered-fields <orderedFields>",
            "specify exact ordered set of fields",
            (orderedFieldsIo: string): JiPitchScriptGroupField[] =>
                parseFields(orderedFieldsIo as Io),
        )

    setupScriptAndIo(logDir)

    const {
        sortBy,
        excludedFields,
        orderedFields,
        undirected,
        factoringMode,
        unabbreviated,
        ascii,
    } = program.opts()

    if (sortBy) jiPitchScriptGroupSettings.sortBy = sortBy
    if (excludedFields) jiPitchScriptGroupSettings.excludedFields = excludedFields
    if (orderedFields) {
        // The excluded fields must be wiped out if ordered fields feature is in use.
        // The code which re-orders fields is not smart enough to take into account excluded fields.
        // Think of the ordered fields feature as completely overriding which fields are in use, as well as their order.
        jiPitchScriptGroupSettings.excludedFields = []
        jiPitchScriptGroupSettings.orderedFields = orderedFields
    }

    jiPitchScriptGroupSettings.commaNameOptions = {
        directed: !undirected,
        factoringMode: factoringMode || FactoringMode.THRESHOLD,
        abbreviated: !unabbreviated,
        ascii,
    }
}

export { applySharedJiPitchScriptSetup }
