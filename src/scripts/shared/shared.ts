import {BLANK, Filename, Io, program, Scamon, ScriptFlag, setupScriptAndIo} from "@sagittal/general"
import {FactoringMode} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../globals"
import {parsePitch} from "../../io"
import {JiPitchScriptGroupField} from "../../types"
import {parseExclusive, parseFields, parseSortBy} from "./parse"

const applySharedJiPitchScriptSetup = (logDir?: Filename): void => {
    program
        .option(
            `-${ScriptFlag.LOWER_BOUND}, --lower-bound <lowerBound>`,
            "lower bound",
            (pitchIo: string): Scamon => parsePitch(pitchIo as Io))
        .option(
            `-${ScriptFlag.UPPER_BOUND}, --upper-bound <upperBound>`,
            "upper bound",
            (pitchIo: string): Scamon => parsePitch(pitchIo as Io),
        )
        .option(`-${ScriptFlag.EXCLUSIVE}, --exclusive [exclusive]`, "exclusive bounds", parseExclusive)
        .option(`-${ScriptFlag.MAX_AAS}, --max-aas <maxAas>`, "max AAS", parseFloat)
        .option(`-${ScriptFlag.MAX_ATE}, --max-ate <maxAte>`, "max ATE", parseInt)
        .option(`-${ScriptFlag.PRIME_LIMIT}, --max-prime-limit <maxPrimeLimit>`, "max prime limit", parseInt)
        .option(
            `-${ScriptFlag.MAX_2_3_FREE_SOPFR}, --max-2-3-free-sopfr <max23FreeSopfr>`,
            "max 2,3-free sopfr",
            parseInt)
        .option(
            `-${ScriptFlag.MAX_2_3_FREE_COPFR}, --max-2-3-free-copfr <max23FreeCopfr>`,
            "max 2,3-free copfr",
            parseInt,
        )
        .option(`-${ScriptFlag.MAX_N2D3P9}, --max-n2d3p9 <maxN2d3p9>`, "max n2d3p9", parseFloat)
        .option(`-${ScriptFlag.SORT_BY}, --sort-by <sortBy>`, "sort by", parseSortBy)
        .option(`-${ScriptFlag.UNDIRECTED_COMMA_NAME}, --undirected`, "undirected comma name")
        .option(`-${ScriptFlag.FACTORING_MODE}, --factoring-mode <factoringMode>`, "factoring mode (always, never, or threshold)")
        .option(`-${ScriptFlag.UNABBREVIATED_COMMA_NAME}, --unabbreviated`, "unabbreviated comma name")
        .option(
            `-${ScriptFlag.EXCLUDED_FIELDS}, --excluded-fields <excludedFields>`,
            "exclude fields",
            (excludedFieldsIo: string): JiPitchScriptGroupField[] => parseFields(excludedFieldsIo as Io),
        )
        .option(
            `-${ScriptFlag.ORDERED_FIELDS}, --ordered-fields <orderedFields>`,
            "specify exact ordered set of fields",
            (orderedFieldsIo: string): JiPitchScriptGroupField[] => parseFields(orderedFieldsIo as Io),
        )

    setupScriptAndIo(logDir)

    if (program.sortBy) jiPitchScriptGroupSettings.sortBy = program.sortBy
    if (program.excludedFields) jiPitchScriptGroupSettings.excludedFields = program.excludedFields
    if (program.orderedFields) {
        // The excluded fields must be wiped out if ordered fields feature is in use.
        // The code which re-orders fields is not smart enough to take into account excluded fields.
        // Think of the ordered fields feature as completely overriding which fields are in use, as well as their order.
        jiPitchScriptGroupSettings.excludedFields = []
        jiPitchScriptGroupSettings.orderedFields = program.orderedFields
    }

    jiPitchScriptGroupSettings.commaNameOptions = {
        directed: !program.undirected,
        factoringMode: program.factoringMode || FactoringMode.THRESHOLD,
        abbreviated: !program.unabbreviated,
    }
}

export {
    applySharedJiPitchScriptSetup,
}
