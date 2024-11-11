import {
    Filename,
    LogTarget,
    program,
    saveLog,
    scriptSettings,
    setupScriptAndIo,
    time,
} from "@sagittal/general"
import {
    computeBestCommaPerSemitinaZone,
    computeMetacommasAndBucketSortAndLogOccams,
} from "../semitinaOccams"

program.option(
    "--complexity-only",
    "ignore error when choosing best commas per zone, essentially using a complexity measure rather than a full badness measure",
)

setupScriptAndIo("semitinaOccams" as Filename, [
    LogTarget.PROGRESS,
    LogTarget.DETAILS,
    LogTarget.FINAL,
    LogTarget.ERROR,
])

const { complexityOnly } = program.opts()
const bestCommaPerSemitinaZone = computeBestCommaPerSemitinaZone(!!complexityOnly)

computeMetacommasAndBucketSortAndLogOccams(bestCommaPerSemitinaZone)

if (scriptSettings.time) saveLog(`\n\nTOOK ${time()}`, LogTarget.FINAL)
