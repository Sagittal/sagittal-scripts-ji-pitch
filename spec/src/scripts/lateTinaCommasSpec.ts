import { Io, slowTestOnlyRunInFullSuite, runScriptAndGetConsoleOutput } from "@sagittal/general"

describe("late-tina-commas", (): void => {
    it("finds LATE commas for tinas", (): void => {
        slowTestOnlyRunInFullSuite()

        const script = "npm run late-tina-commas -- --max-2-3-free-sopfr 37" as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            `NO COMMAS given current constraints for tina 0.5.`,
            `NO LATE COMMAS given current constraints for tina 1.`,
            `NO LATE COMMAS given current constraints for tina 1.5.`,
            `NO LATE COMMAS given current constraints for tina 2.`,
            `NO COMMAS given current constraints for tina 2.5.`,
            `TINA 3: {"pitch":{"vector":[12,-2,-1,-1,0,-1]},"vector":[12,-2,-1,-1,0,-1],"quotient":[4096,4095],"cents":0.42271616595482425,"decimal":1.0002442002442002,"two3FreeClassAnalysis":{"two3FreeClass":{"vector":[0,0,1,1,0,1]},"name":"{455}₂,₃","two3FreePrimeLimit":13,"two3FreeSopfr":25,"two3FreeCopfr":3,"n2d3p9":82.15277777777777},"apotomeSlope":-2.0260281743766777,"aas":2.0260281743766777,"ate":2,"sizeCategory":1,"name":"1/(5⋅7⋅13)n"}`,
            `NO COMMAS given current constraints for tina 3.5.`,
            `NO LATE COMMAS given current constraints for tina 4.`,
            `NO COMMAS given current constraints for tina 4.5.`,
            `NO LATE COMMAS given current constraints for tina 5.`,
            `NO COMMAS given current constraints for tina 5.5.`,
            `TINA 6: {"pitch":{"vector":[5,-3,1,-1,-1,1]},"vector":[5,-3,1,-1,-1,1],"quotient":[2080,2079],"cents":0.8325242041015989,"decimal":1.0004810004810005,"two3FreeClassAnalysis":{"two3FreeClass":{"vector":[0,0,-1,1,1,-1]},"name":"{77/65}₂,₃","two3FreePrimeLimit":13,"two3FreeSopfr":36,"two3FreeCopfr":4,"n2d3p9":200.8179012345679},"apotomeSlope":-3.0512615482973438,"aas":3.0512615482973438,"ate":3,"sizeCategory":1,"name":"65/77n"}`,
            `NO COMMAS given current constraints for tina 6.5.`,
            `TINA 7: {"pitch":{"vector":[-2,5,-2,1,0,0,-1]},"vector":[-2,5,-2,1,0,0,-1],"quotient":[1701,1700],"cents":1.0180735659853197,"decimal":1.0005882352941178,"two3FreeClassAnalysis":{"two3FreeClass":{"vector":[0,0,2,-1,0,0,1]},"name":"{425/7}₂,₃","two3FreePrimeLimit":17,"two3FreeSopfr":34,"two3FreeCopfr":4,"n2d3p9":234.14351851851853},"apotomeSlope":4.9373135014983465,"aas":4.9373135014983465,"ate":5,"sizeCategory":1,"name":"7/(5²⋅17)n"}`,
            `NO COMMAS given current constraints for tina 7.5.`,
            `NO LATE COMMAS given current constraints for tina 8.`,
            `NO COMMAS given current constraints for tina 8.5.`,
            `TINA 9: {"pitch":{"vector":[17,-5,0,-2,-1]},"vector":[17,-5,0,-2,-1],"quotient":[131072,130977],"cents":1.255240370056446,"decimal":1.0007253181856357,"two3FreeClassAnalysis":{"two3FreeClass":{"vector":[0,0,0,2,1]},"name":"{539}₂,₃","two3FreePrimeLimit":11,"two3FreeSopfr":25,"two3FreeCopfr":3,"n2d3p9":82.34722222222221},"apotomeSlope":-5.077289722674022,"aas":5.077289722674022,"ate":5,"sizeCategory":1,"name":"1/(7²⋅11)n"}`,
            `NO COMMAS given current constraints for tina 9.5.`,
        ] as Io[]
        expect(actual).toEqual(expected)
    })
})
