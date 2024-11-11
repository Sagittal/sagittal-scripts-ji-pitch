import {
    Comma,
    Index,
    indexOfFinalElement,
    LogTarget,
    Name,
    RecordKey,
    saveLog,
    ScaledVector,
    stringify,
    subtractRationalScaledVectors,
} from "@sagittal/general"
import { computeCommaName, OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE } from "@sagittal/system"
import { metacommaNameToMetacommaMap } from "../../globals"
import { Semitina } from "../types"
import { checkMetacommaConsistency } from "./consistency"
import { BucketName, Occam } from "./types"

const computeFractionalTinaOccamBucket = (
    bestCommaPerSemitinaZone: [Index<Semitina>, Comma][],
): Record<RecordKey<Name<Comma>>, Occam> => {
    const fractionalTinaOccamBucket: Record<RecordKey<Name<Comma>>, Occam> = {}

    bestCommaPerSemitinaZone.forEach(
        (bestCommaPerSemitinaZoneEntry: [Index<Semitina>, Comma], index: number): void => {
            if (index === indexOfFinalElement(bestCommaPerSemitinaZone)) return

            const [semitinaZone, bestCommaInThisSemitinaZone] = bestCommaPerSemitinaZoneEntry

            const subsequentBestCommaInThatSemitinaZone = bestCommaPerSemitinaZone[index + 1][1]

            const metacommaBetweenConsecutiveBestCommas = subtractRationalScaledVectors(
                subsequentBestCommaInThatSemitinaZone,
                bestCommaInThisSemitinaZone,
            ) as ScaledVector as Comma
            const metacommaName = computeCommaName(
                metacommaBetweenConsecutiveBestCommas,
                OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE,
            )
            fractionalTinaOccamBucket[metacommaName] =
                fractionalTinaOccamBucket[metacommaName] || (0 as Occam)
            fractionalTinaOccamBucket[metacommaName] = (fractionalTinaOccamBucket[metacommaName] + 1) as Occam

            checkMetacommaConsistency(metacommaBetweenConsecutiveBestCommas, 0 as BucketName)

            metacommaNameToMetacommaMap[metacommaName] = metacommaBetweenConsecutiveBestCommas

            saveLog(
                `semitina zone ${semitinaZone}: ${stringify(metacommaBetweenConsecutiveBestCommas)}`,
                LogTarget.DETAILS,
            )
        },
    )

    saveLog(
        "metacommas between consecutive best commas per semitina zone gathered, and fractional tina occams bucketed",
        LogTarget.PROGRESS,
    )

    return fractionalTinaOccamBucket
}

export { computeFractionalTinaOccamBucket }
