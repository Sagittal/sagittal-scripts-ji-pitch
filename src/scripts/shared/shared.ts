import { Filename, Io, program, setupScriptAndIo, ScaledVector, SortBy, Maybe } from "@sagittal/general"
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
            (pitchIo: string): ScaledVector => parsePitch(pitchIo as Io) as ScaledVector,
        )
        .option(
            "--upper-bound <upperBound>",
            "upper bound",
            (pitchIo: string): ScaledVector => parsePitch(pitchIo as Io) as ScaledVector,
        )
        .option("--exclusive [exclusive]", "exclusive bounds", parseExclusive)
        .option("--max-aas <maxAas>", "max AAS", parseFloat)
        .option("--max-ate <maxAte>", "max ATE", parseInt)
        .option("--max-prime-limit <maxPrimeLimit>", "max prime limit", parseInt)
        .option("--max-2-3-free-sopfr <max23FreeSopfr>", "max 2,3-free sopfr", parseInt)
        .option("--max-2-3-free-copfr <max23FreeCopfr>", "max 2,3-free copfr", parseInt)
        .option("--max-n2d3p9 <maxN2d3p9>", "max n2d3p9", parseFloat)
        .option("--sort-by <sortBy>", "sort by", parseSortBy)
        .option(
            "--directed-word <directedWord>",
            "directed word i.e. up or down (always, never, or conditionally)",
        )
        .option("--directed-numbers <directedNumbers>", "directed numbers (on, off, or off-with-colon)")
        .option("--factoring-mode <factoringMode>", "factoring mode (always, never, or threshold)")
        .option("--unabbreviated", "unabbreviated comma name")
        .option("--ascii", "ascii comma name")
        .option(
            "--excluded-fields <excludedFields>",
            "exclude fields",
            (excludedFieldsIo: string): JiPitchScriptGroupField[] => parseFields(excludedFieldsIo as Io),
        )
        .option(
            "--ordered-fields <orderedFields>",
            "specify exact ordered set of fields",
            (orderedFieldsIo: string): JiPitchScriptGroupField[] => parseFields(orderedFieldsIo as Io),
        )

    setupScriptAndIo(logDir)

    const {
        sortBy,
        excludedFields,
        orderedFields,
        directedWord,
        directedNumbers,
        factoringMode,
        unabbreviated,
        ascii,
    }: {
        sortBy: SortBy
        excludedFields: JiPitchScriptGroupField[]
        orderedFields: Maybe<JiPitchScriptGroupField[]>
        directedWord: string
        directedNumbers: string
        factoringMode: FactoringMode
        unabbreviated: boolean
        ascii: boolean
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
        directedWord: directedWord === "always" ? 0 : directedWord === "never" ? 2 : 1,
        directedNumbers: directedNumbers === "on" ? 0 : directedNumbers === "off" ? 1 : 2,
        factoringMode: factoringMode || FactoringMode.THRESHOLD,
        abbreviated: !unabbreviated,
        ascii,
    }
}

export { applySharedJiPitchScriptSetup }
