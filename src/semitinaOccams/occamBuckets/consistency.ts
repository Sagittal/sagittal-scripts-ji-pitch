import { Comma, mapVector, Decimal, LogTarget, saveLog, Integer } from "@sagittal/general"
import { computeCommaName, formatComma, INSANE_ZETA_PEAK_MAP } from "@sagittal/system"
import { inconsistentMetacommas } from "../../globals"
import { BucketName } from "./types"

const checkMetacommaConsistency = (metacomma: Comma, tinaBucket: BucketName): void => {
    const mappedTina = mapVector(metacomma.vector, INSANE_ZETA_PEAK_MAP)
    const insaneZetaPeakEdoConsistent = (mappedTina as Decimal<Integer>) === tinaBucket

    if (!insaneZetaPeakEdoConsistent) {
        const metacommaName = computeCommaName(metacomma)
        inconsistentMetacommas[metacommaName] = mappedTina
        saveLog(
            `FYI, this metacomma for a whole tina (which is within 9.5 tinas and therefore we care about it) is inconsistent! ${formatComma(
                metacomma,
            )} maps to ${mappedTina} steps of 8539.00834-EDO despite being bucketed for tina ${tinaBucket}`,
            LogTarget.ERROR,
        )
    }
}

export { checkMetacommaConsistency }
