import {Filename, ioSettings, LogTarget, program, saveLog, ScriptFlag, setupScriptAndIo, time} from "@sagittal/general"
import {computeBestCommaPerSemitinaZone, computeMetacommasAndBucketSortAndLogOccams} from "../semitinaOccams"

program
    .option(`-${ScriptFlag.COMPLEXITY_ONLY}, --complexity-only`, "ignore error when choosing best commas per zone, essentially using a complexity measure rather than a full badness measure")

setupScriptAndIo(
    "semitinaOccams" as Filename,
    [LogTarget.PROGRESS, LogTarget.DETAILS, LogTarget.FINAL, LogTarget.ERROR],
)

const bestCommaPerSemitinaZone = computeBestCommaPerSemitinaZone(!!program.complexityOnly)

computeMetacommasAndBucketSortAndLogOccams(bestCommaPerSemitinaZone)

if (ioSettings.time) saveLog(`\n\nTOOK ${time()}`, LogTarget.FINAL)
