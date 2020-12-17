import {Filename, Io, LogTarget, Maybe, saveLog} from "@sagittal/general"
import {CommaAnalysis, CommaClassId, computeMaybeCommaClassId} from "@sagittal/system"
import {DEFAULT_ANALYZE_JI_PITCH_AND_FIND_COMMAS_SORT_KEY} from "../constants"
import {computeFindCommasOptions, findCommaAnalyses} from "../findCommas"
import {jiPitchScriptGroupSettings} from "../globals"
import {computeFindCommasOutput} from "../io"
import {applySharedJiPitchScriptSetup} from "./shared"

// TODO: FIND JI PITCHES
//  It occurs to me ... why limit to comma search?
//  Maybe all JI pitches should become the relatively new "potentially comma analysis" type, with maybes for comma props
//  And just eliminate the old JiPitchAnalysis type and use the "potentially" instead
//  Because... why wouldn't you just want to search all JI pitches per these types of criteria?
//  And related, why wouldn't you want to see comma name and Sagittal symbol, if any,
//  In the top table of analyze-ji-pitch?

jiPitchScriptGroupSettings.sortBy = DEFAULT_ANALYZE_JI_PITCH_AND_FIND_COMMAS_SORT_KEY
applySharedJiPitchScriptSetup("findCommas" as Filename)

const findCommasOptions = computeFindCommasOptions()
const commaAnalyses: CommaAnalysis[] = findCommaAnalyses(findCommasOptions)
const maybeCommaClassIds: Array<Maybe<CommaClassId>> = commaAnalyses
    .map((commaAnalysis: CommaAnalysis): Maybe<CommaClassId> => {
        return computeMaybeCommaClassId(commaAnalysis.pitch)
    })
const findCommasOutput: Io = computeFindCommasOutput(commaAnalyses, maybeCommaClassIds, findCommasOptions)
saveLog(findCommasOutput, LogTarget.FINAL)
