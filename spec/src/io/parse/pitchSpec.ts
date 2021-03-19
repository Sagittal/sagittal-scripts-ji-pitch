import {Io, IRRATIONAL_SPEV_BASE_PEV, Pev, Quotient, Spev} from "@sagittal/general"
import {parsePitch} from "../../../../src/io"

describe("parsePitch", (): void => {
    it("works when given as a pev, returning a JI pitch", (): void => {
        const pitchText = "[0, 1, -2, 1⟩" as Io

        const actual = parsePitch(pitchText)

        const expected = {pev: [0, 1, -2, 1]} as Spev<{rational: true}>
        expect(actual).toEqual(expected)
    })

    it("works when given as a quotient, returning a JI pitch", (): void => {
        const pitchText = "7/2" as Io

        const actual = parsePitch(pitchText)

        const expected = {pev: [-1, 0, 0, 1]} as Spev<{rational: true}>
        expect(actual).toEqual(expected)
    })

    it("works when given as a comma name, returning a JI pitch", (): void => {
        const pitchText = "3A" as Io

        const actual = parsePitch(pitchText)

        const expected = {pev: [-11, 7]} as Spev<{rational: true}>
        expect(actual).toEqual(expected)
    })

    it("works when given as cents, returning a non-JI pitch", (): void => {
        const pitchText = "33.4c" as Io

        const actual = parsePitch(pitchText)

        const expected = {
            pev: IRRATIONAL_SPEV_BASE_PEV,
            scaler: [0.027833, 1] as Quotient,
        } as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("works when given as a rational decimal, returning a JI pitch", (): void => {
        const pitchText = "3.4" as Io

        const actual = parsePitch(pitchText)

        const expected = {pev: [0, 0, -1, 0, 0, 0, 1]} as Spev<{rational: true}>
        expect(actual).toEqual(expected)
    })

    it("works when given as an irrational (non-JI) decimal, returning a non-JI pitch", (): void => {
        const pitchText = "3.437838" as Io

        const actual = parsePitch(pitchText)

        const expected = {
            pev: IRRATIONAL_SPEV_BASE_PEV,
            scaler: [1.781502, 1] as Quotient,
        } as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("works when given as an accidental", (): void => {
        const pitchText = ",'/|)<b" as Io

        const actual = parsePitch(pitchText)

        //   [ -25  12   1   0   0   1 ⟩   ,'/|)
        // + [  16  -8   0   0  -1     ⟩        <b
        // = [  -9   4   1   0  -1   1 ⟩   ,'/|)<b
        const expected = {pev: [-9, 4, 1, 0, -1, 1]} as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("whoa did I just find an edge case? yes I did, but the fix was in @sagittal/general", (): void => {
        const pitchText = "Y/" as Io

        const actual = parsePitch(pitchText)

        const expected = {pev: [18, -10, -1]} as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("another accidental example (just trying to use all the chars that might be used in other formats, to prove it works at distinguishing accidentals)", (): void => {
        const pitchText = "`.!(>#"

        const actual = parsePitch(pitchText)

        // - [  -4   9  -2  -2     ⟩   ,'|(
        // + [ -16   8   0   0   1 ⟩       >#
        // = [ -12  -1   2   2   1 ⟩   `.!(>#
        const expected = {pev: [-12, -1, 2, 2, 1]} as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("yet another accidental example", (): void => {
        const pitchText = "\\!~x"

        const actual = parsePitch(pitchText)

        // - [   1  -2  -1   0   0   0   0   0   1 ⟩    /|~
        // + [ -22  14                             ⟩       x
        // = [ -23  16   1   0   0   0   0   0  -1 ⟩    \!~x
        const expected = {pev: [-23, 16, 1, 0, 0, 0, 0, 0, -1]} as Spev<{rational: false}>
        expect(actual).toBeCloseToObject(expected)
    })

    it("can handle an empty pev", (): void => {
        const pitchText = "[]"

        const actual = parsePitch(pitchText)

        const expected = {pev: [] as unknown[] as Pev<{rational: true}>} as Spev<{rational: true}>
        expect(actual).toEqual(expected)
    })
})
