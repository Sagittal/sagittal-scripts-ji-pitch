import { count, Count, Exponent, Max, max, Prime } from "@sagittal/general"
import { JiPitchAnalysis } from "@sagittal/system"

const computeMaxVectorLength = (jiPitchAnalyses: JiPitchAnalysis[]): Max<Count<Exponent<Prime>>> =>
    max(
        ...jiPitchAnalyses.map((jiPitchAnalysis: JiPitchAnalysis): Count<Exponent<Prime>> => {
            return count(jiPitchAnalysis.vector)
        }),
    )

export { computeMaxVectorLength }
