import {Exclusive, Io, KeyPath} from "@sagittal/general"
import {parseExclusive, parseFields, parseSortBy} from "../../../../src/scripts/shared/parse"
import {CommaField, JiPitchField} from "../../../../src/types"

describe("parseFields", (): void => {
    it("splits the fields by comma", (): void => {
        const fieldsIo = "monzo,name" as Io

        const actual = parseFields(fieldsIo)

        const expected = [JiPitchField.MONZO, CommaField.NAME]
        expect(actual).toEqual(expected)
    })

    it("throws an error if a field does not exist", (): void => {
        const fieldsIo = "two3FreeClass,two3FreePrimeLimit" as Io

        expect((): void => {
            parseFields(fieldsIo)
        }).toThrowError("Tried to parse field two3FreeClass but it is not a member of the list of possible fields: {quotient,monzo,cents,apotomeSlope,aas,ate,commaClass,name,sizeCategory,two3FreePrimeLimit,two3FreeClassName,two3FreeCopfr,two3FreeSopfr,n2d3p9}, as well as specific terms of some fields e.g. monzo2, quotientN")
    })
})

describe("parseExclusive", (): void => {
    it("works when given as a single boolean", (): void => {
        const exclusiveIo = true

        const actual = parseExclusive(exclusiveIo)

        const expected = true
        expect(actual).toBe(expected)
    })

    it("works when given as a comma separated string representation of a tuple", (): void => {
        const exclusiveIo = "true,false" as Io

        const actual = parseExclusive(exclusiveIo)

        const expected = [true, false] as Exclusive
        expect(actual).toEqual(expected)
    })
})

describe("parseSortBy", (): void => {
    it("works when given a simple property", (): void => {
        const sortByIo = "cents" as Io

        const actual = parseSortBy(sortByIo)

        const expected = ["cents"] as KeyPath[]
        expect(actual).toEqual(expected)
    })

    it("works when given multiple properties", (): void => {
        const sortByIo = "cents,name" as Io

        const actual = parseSortBy(sortByIo)

        const expected = ["cents", "name"] as KeyPath[]
        expect(actual).toEqual(expected)
    })

    it("works when given a 2,3-free class property", (): void => {
        const sortByIo = "two3FreeClassName" as Io

        const actual = parseSortBy(sortByIo)

        const expected = [{two3FreeClassAnalysis: "name"} as Record<string, string>] as KeyPath[]
        expect(actual).toEqual(expected)
    })

    it("works when given a specific term of a monzo", (): void => {
        const sortByIo = "monzo5" as Io

        const actual = parseSortBy(sortByIo)

        const expected = [{monzo: 2} as Record<string, number>] as KeyPath[]    // 5 is the 3rd prime, AKA index 2
        expect(actual).toEqual(expected)
    })

    it("works when given a specific fractional part of a quotient", (): void => {
        const sortByIo = "quotientD" as Io

        const actual = parseSortBy(sortByIo)

        const expected = [{quotient: 1} as Record<string, number>] as KeyPath[] // Denominator is its 2nd element
        expect(actual).toEqual(expected)
    })

    it("works when given a specific fractional part of a 2,3-free class name", (): void => {
        const sortByIo = "two3FreeClassNameN" as Io

        const actual = parseSortBy(sortByIo)

        const expected = [{two3FreeClassAnalysis: {name: 0}} as Record<string, Record<string, number>>] as KeyPath[]
        expect(actual).toEqual(expected)
    })
})
