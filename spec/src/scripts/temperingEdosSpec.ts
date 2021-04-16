import {Io, onlyRunInCi, runScriptAndGetConsoleOutput} from "@sagittal/general"

describe("tempering-edos", (): void => {
    it("returns the list of EDOs which temper a given comma", (): void => {
        onlyRunInCi()

        const script = `npm run tempering-edos 81/80` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "[5,7,12,19,24,26,31,36,38,43,45,50,55,57,62,67,69,74,76,81,86,88,93,98,100,105,117,129]",
        ] as Io[]
        expect(actual).toEqual(expected)
    })
})
