import {onlyRunInCi} from "@sagittal/general"
import {computeAllCommasLessThanHalfApotome} from "../../../../src/semitinaOccams/bestZoneCommas"

describe("computeAllCommasLessThanHalfApotome", (): void => {
    it("finds the correct count of commas", (): void => {
        onlyRunInCi()

        const actual = computeAllCommasLessThanHalfApotome()

        expect(actual.length).toBe(18233)
    })
})
