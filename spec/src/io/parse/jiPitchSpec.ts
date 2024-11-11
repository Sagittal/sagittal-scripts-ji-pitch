import { program, Rational, ScaledVector } from "@sagittal/general"
import { ArmId, Compatible, computeAccidental, HeadId } from "@sagittal/system"
import { parseJiPitch, readJiPitchIoAndFormat } from "../../../../src/io"

describe("parseJiPitch", (): void => {
    beforeEach((): void => {
        program.args = []
        program.setOptionValue("vector", undefined)
        program.setOptionValue("quotient", undefined)
        program.setOptionValue("commaName", undefined)
        program.setOptionValue("integer", undefined)
        program.setOptionValue("accidental", undefined)
    })

    describe("when the JI pitch is provided as an argument directly (not as a specific flag)", (): void => {
        it("works for a vector", (): void => {
            program.args = ["[0, 1, -2, 1⟩"]
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [0, 1, -2, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for a quotient", (): void => {
            program.args = ["7/2"]
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [-1, 0, 0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for a comma name", (): void => {
            program.args = ["3A"]
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [-11, 7] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for an integer decimal", (): void => {
            program.args = ["3"]
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for an accidental", (): void => {
            program.args = ["``~~|#"]
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            // ``~~|# =
            // ``~~|    [  13  -9   0  -1   0   0   1 ⟩
            //      #   [ -11   7                     ⟩
            const expected = { vector: [2, -2, 0, -1, 0, 0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })
    })

    describe("when the JI pitch is provided by a specific flag", (): void => {
        it("works for a vector (which will have been pre-parsed)", (): void => {
            program.setOptionValue("vector", [0, 1, -2, 1])
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [0, 1, -2, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for a quotient (which will have been pre-parsed)", (): void => {
            program.setOptionValue("quotient", [7, 2])
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [-1, 0, 0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for a comma name (which will have been pre-parsed into a comma)", (): void => {
            program.setOptionValue("commaName", { vector: [-11, 7] })
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [-11, 7] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for an integer decimal (which will have been pre-parsed as such)", (): void => {
            program.setOptionValue("integer", 3)
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            const expected = { vector: [0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })

        it("works for an accidental (which will have been pre-parsed as such)", (): void => {
            program.setOptionValue(
                "accidental",
                computeAccidental({
                    // ``~~|#
                    armId: ArmId.BIRD,
                    headId: HeadId.DOUBLE_LEFT_BOATHOOK,
                    compatible: Compatible.SHARP,
                }),
            )
            const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()

            const actual = parseJiPitch(jiPitchIo, pitchFormat)

            // ``~~|# =
            // ``~~|    [  13  -9   0  -1   0   0   1 ⟩
            //      #   [ -11   7                     ⟩
            const expected = { vector: [2, -2, 0, -1, 0, 0, 1] } as ScaledVector<Rational>
            expect(actual).toEqual(expected)
        })
    })
})
