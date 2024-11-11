import { formatQuotient, Formatted, ioSettings, Quotient, TableFormat } from "@sagittal/general"
import { JiPitchAnalysis } from "@sagittal/system"

const formatSplitQuotient = (quotient: Quotient): Formatted<JiPitchAnalysis>[] => {
    const formattedQuotient = formatQuotient(quotient)
    if (ioSettings.tableFormat === TableFormat.FORUM) {
        return [formattedQuotient] as Formatted[] as Formatted<JiPitchAnalysis>[]
    } else {
        // eslint-disable-next-line prefer-const
        let [formattedNumerator, formattedDenominator] = formattedQuotient.split(
            "/",
        ) as Formatted<JiPitchAnalysis>[]

        formattedDenominator = formattedDenominator || ("1" as Formatted<JiPitchAnalysis>)

        return [formattedNumerator, "/" as Formatted<JiPitchAnalysis>, formattedDenominator]
    }
}

export { formatSplitQuotient }
