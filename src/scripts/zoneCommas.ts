import {
    Comma,
    Filename,
    isUndefined,
    LogTarget,
    program,
    saveLog,
    ScriptFlag,
    scriptSettings,
    stringify,
    time,
} from "@sagittal/general"
import {
    CommaClassId,
    computeJiNotationCaptureZone,
    computeSecondaryCommaZone,
    formatCommaClass,
    JiNotationLevelId,
    JI_NOTATION_COMMA_CLASS_IDS,
} from "@sagittal/system"
import {computeFindCommasOptions, findCommas, FindCommasOptions} from "../findCommas"
import {jiPitchScriptGroupSettings} from "../globals"
import {applySharedJiPitchScriptSetup} from "./shared"

program
    .option(`-${ScriptFlag.SECONDARY_COMMA_ZONES}, --secondary-comma-zones`, "use commas in each comma's secondary comma zone, rather than the default behavior of its capture zone in the Extreme precision level notation")

applySharedJiPitchScriptSetup("zoneCommas" as Filename)

const findCommasOptions = computeFindCommasOptions()

const zoneCommas = JI_NOTATION_COMMA_CLASS_IDS.reduce(
    (
        zoneCommas: Record<CommaClassId, Comma[]>,
        commaClassId: CommaClassId,
    ): Record<CommaClassId, Comma[]> => {
        saveLog(formatCommaClass(commaClassId, {name: true}), LogTarget.PROGRESS)

        const zone = program.extremeCaptureZones ?
            computeJiNotationCaptureZone(commaClassId, JiNotationLevelId.EXTREME) :
            computeSecondaryCommaZone(commaClassId)

        if (isUndefined(zone)) {
            throw new Error(`Unable to find zone for comma class Id ${commaClassId}.`)
        }

        const options: FindCommasOptions = {
            ...jiPitchScriptGroupSettings,
            ...findCommasOptions,
        }
        if (zone) options.zone = zone

        return {
            ...zoneCommas,
            [commaClassId]: findCommas(options),
        }
    },
    {} as Record<CommaClassId, Comma[]>,
)

saveLog(stringify(zoneCommas, {multiline: true}), LogTarget.FINAL)

if (scriptSettings.time) saveLog(`\nFINDING ZONE COMMAS TOOK ${time()}`, LogTarget.FINAL)
