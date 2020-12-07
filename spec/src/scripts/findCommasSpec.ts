import {Io, onlyRunInCi, runScriptAndGetConsoleOutput} from "@sagittal/general"
import {
    OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS,
    OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS,
    OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS,
} from "../../helpers/src/constants"

describe("find-commas", (): void => {
    it("finds commas, given the finding options", (): void => {
        onlyRunInCi()

        const script = `           \
        npm run find-commas --      \
         --lower-bound 30c          \
         --upper-bound 30.5c        \
         --max-ate 2                \
         --max-2-3-free-copfr 3     \
         --max-prime-limit 37       \
         --max-2-3-free-sopfr 58    \
         --max-aas 3                \
         --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS}    \
        ` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t        30.000¢ (inclusive)",
            "upper bound:       \t        30.500¢ (inclusive)",
            "max ATE:           \t  2    ",
            "max AAS:           \t  3.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 58    ",
            "max 2,3-free copfr:\t  3    ",
            "max prime limit:   \t 37    ",
            "",
            "     \t      \t        \t \t  \t     \t       \t       \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t  \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma\t      \tquotient\t \t  \tmonzo\t       \t       \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t  \t   \tclass   \tclass   \tclass   ",
            "class\tname  \t       n\t/\td \t     \t  2    \t  3    \t  5    \t  7    \t 11    \t 13    \t 17    \t 19    \t 23    \t 29    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td \t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "     \t29/19C\t      58\t/\t57\t    [\t  1    \t -1    \t  0    \t  0    \t  0    \t  0    \t  0    \t -1    \t  0    \t  1    \t⟩\t        30.109¢\t -2.854\t  2.854\t  1    \t 29     \t      29\t/\t19\t₂,₃\t  2     \t 48     \t295.907 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can sort the resulting list by a specific field", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --lower-bound 50c --upper-bound 50.31c --sort-by apotomeSlope --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t        50.000¢ (inclusive)",
            "upper bound:       \t        50.310¢ (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t 47    ",
            "",
            "        \t           \t        \t \t        \t     \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t  \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t           \tquotient\t \t        \tmonzo\t       \t       \t       \t       \t       \t       \t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t  \t   \tclass   \tclass   \tclass   ",
            "class   \tname       \t       n\t/\td       \t     \t  2    \t  3    \t  5    \t  7    \t 11    \t 13    \t 17    \t 19    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td \t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "        \t19/(5²⋅7)M \t    4864\t/\t4725    \t    [\t  8    \t -3    \t -2    \t -1    \t  0    \t  0    \t  0    \t  1    \t⟩\t        50.195¢\t -6.091\t  6.091\t  3    \t 19     \t     175\t/\t19\t₂,₃\t  4     \t 36     \t292.477 ",
            "        \t35/17M     \t      35\t/\t34      \t    [\t -1    \t  0    \t  1    \t  1    \t  0    \t  0    \t -1    \t       \t⟩\t        50.184¢\t -3.090\t  3.090\t  0    \t 17     \t      35\t/\t17\t₂,₃\t  3     \t 29     \t 93.657 ",
            "  ,'/|) \t65M        \t34543665\t/\t33554432\t    [\t-25    \t 12    \t  1    \t  0    \t  0    \t  1    \t       \t       \t⟩\t        50.301¢\t  8.903\t  8.903\t 12    \t 13     \t      65\t/\t1 \t₂,₃\t  2     \t 18     \t 23.472 ",
            "        \t1/(5²⋅11²)M\t 1594323\t/\t1548800 \t    [\t -9    \t 13    \t -2    \t  0    \t -2    \t       \t       \t       \t⟩\t        50.152¢\t  9.912\t  9.912\t 13    \t 11     \t    3025\t/\t1 \t₂,₃\t  4     \t 32     \t231.076 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can sort the resulting list by more than one field", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --sort-by n2d3p9,cents --max-prime-limit 7 --max-n2d3p9 8 --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t[  ⟩ (inclusive)",
            "upper bound:       \t[ -11   7 ⟩(1/2) (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t  8.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t  7    ",
            "",
            "        \t     \t        \t \t       \t     \t       \t       \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t     \tquotient\t \t       \tmonzo\t       \t       \t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t \t   \tclass   \tclass   \tclass   ",
            "class   \tname \t       n\t/\td      \t     \t  2    \t  3    \t  5    \t  7    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td\t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            " (|//|) \t1u   \t       1\t/\t1      \t    [\t       \t       \t       \t       \t⟩\t         0.000¢\t  0.000\t  0.000\t  0    \t  1     \t       1\t/\t1\t₂,₃\t  0     \t  0     \t  1.000 ",
            "   '/|  \t3C   \t  531441\t/\t524288 \t    [\t-19    \t 12    \t       \t       \t⟩\t        23.460¢\t 10.555\t 10.555\t 12    \t  1     \t       1\t/\t1\t₂,₃\t  0     \t  0     \t  1.000 ",
            "    '|  \t5s   \t   32805\t/\t32768  \t    [\t-15    \t  8    \t  1    \t       \t⟩\t         1.954¢\t  7.880\t  7.880\t  8    \t  5     \t       5\t/\t1\t₂,₃\t  1     \t  5     \t  1.389 ",
            "    /|  \t1/5C \t      81\t/\t80     \t    [\t -4    \t  4    \t -1    \t       \t⟩\t        21.506¢\t  2.676\t  2.676\t  4    \t  5     \t       5\t/\t1\t₂,₃\t  1     \t  5     \t  1.389 ",
            "     |) \t1/7C \t      64\t/\t63     \t    [\t  6    \t -2    \t  0    \t -1    \t⟩\t        27.264¢\t -3.679\t  3.679\t  2    \t  7     \t       7\t/\t1\t₂,₃\t  1     \t  7     \t  2.722 ",
            "   '/|) \t1/7M \t   59049\t/\t57344  \t    [\t-13    \t 10    \t  0    \t -1    \t⟩\t        50.724¢\t  6.877\t  6.877\t 10    \t  7     \t       7\t/\t1\t₂,₃\t  1     \t  7     \t  2.722 ",
            "   ./|  \t1/25C\t    2048\t/\t2025   \t    [\t 11    \t -4    \t -2    \t       \t⟩\t        19.553¢\t -5.204\t  5.204\t  4    \t  5     \t      25\t/\t1\t₂,₃\t  2     \t 10     \t  3.472 ",
            "   //|  \t1/25S\t    6561\t/\t6400   \t    [\t -8    \t  8    \t -2    \t       \t⟩\t        43.013¢\t  5.352\t  5.352\t  8    \t  5     \t      25\t/\t1\t₂,₃\t  2     \t 10     \t  3.472 ",
            "     |( \t5/7k \t    5120\t/\t5103   \t    [\t 10    \t -6    \t  1    \t -1    \t⟩\t         5.758¢\t -6.355\t  6.355\t  6    \t  7     \t       7\t/\t5\t₂,₃\t  2     \t 12     \t  4.537 ",
            "    '|) \t5/7C \t    3645\t/\t3584   \t    [\t -9    \t  6    \t  1    \t -1    \t⟩\t        29.218¢\t  4.201\t  4.201\t  6    \t  7     \t       7\t/\t5\t₂,₃\t  2     \t 12     \t  4.537 ",
            "    .|) \t1/35C\t 2097152\t/\t2066715\t    [\t 21    \t-10    \t -1    \t -1    \t⟩\t        25.310¢\t-11.558\t 11.558\t 10    \t  7     \t      35\t/\t1\t₂,₃\t  2     \t 12     \t  6.806 ", // Here's where it actually makes a difference.
            " `.//|  \t35S  \t    2240\t/\t2187   \t    [\t  6    \t -7    \t  1    \t  1    \t⟩\t        41.455¢\t -9.553\t  9.553\t  7    \t  7     \t      35\t/\t1\t₂,₃\t  2     \t 12     \t  6.806 ", // These two lines would otherwise be swapped.
            "    /|) \t1/35M\t      36\t/\t35     \t    [\t  2    \t  2    \t -1    \t -1    \t⟩\t        48.770¢\t -1.003\t  1.003\t  2    \t  7     \t      35\t/\t1\t₂,₃\t  2     \t 12     \t  6.806 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can set the format of the comma names", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --lower-bound 50c --upper-bound 50.31c --undirected --factoring-mode always --unabbreviated --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t        50.000¢ (inclusive)",
            "upper bound:       \t        50.310¢ (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t 47    ",
            "",
            "        \t                     \t        \t \t        \t     \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t  \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t                     \tquotient\t \t        \tmonzo\t       \t       \t       \t       \t       \t       \t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t  \t   \tclass   \tclass   \tclass   ",
            "class   \tname                 \t       n\t/\td       \t     \t  2    \t  3    \t  5    \t  7    \t 11    \t 13    \t 17    \t 19    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td \t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "  ,'/|) \t5⋅13-Medium-Diesis   \t34543665\t/\t33554432\t    [\t-25    \t 12    \t  1    \t  0    \t  0    \t  1    \t       \t       \t⟩\t        50.301¢\t  8.903\t  8.903\t 12    \t 13     \t      65\t/\t1 \t₂,₃\t  2     \t 18     \t 23.472 ",
            "        \t17:5⋅7-Medium-Diesis \t      35\t/\t34      \t    [\t -1    \t  0    \t  1    \t  1    \t  0    \t  0    \t -1    \t       \t⟩\t        50.184¢\t -3.090\t  3.090\t  0    \t 17     \t      35\t/\t17\t₂,₃\t  3     \t 29     \t 93.657 ",
            "        \t5²⋅11²-Medium-Diesis \t 1594323\t/\t1548800 \t    [\t -9    \t 13    \t -2    \t  0    \t -2    \t       \t       \t       \t⟩\t        50.152¢\t  9.912\t  9.912\t 13    \t 11     \t    3025\t/\t1 \t₂,₃\t  4     \t 32     \t231.076 ",
            "        \t19:5²⋅7-Medium-Diesis\t    4864\t/\t4725    \t    [\t  8    \t -3    \t -2    \t -1    \t  0    \t  0    \t  0    \t  1    \t⟩\t        50.195¢\t -6.091\t  6.091\t  3    \t 19     \t     175\t/\t19\t₂,₃\t  4     \t 36     \t292.477 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can exclude fields from the results", (): void => {
        onlyRunInCi()

        const script = `                                            \
        npm run find-commas --                                      \
         --lower-bound 30c                                          \
         --upper-bound 30.5c                                        \
         --max-ate 2                                                \
         --max-2-3-free-copfr 3                                     \
         --max-prime-limit 37                                       \
         --max-2-3-free-sopfr 58                                    \
         --max-aas 3                                                \
         --excluded-fields aas,ate,sizeCategory                     \
         --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS}    \
        ` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t        30.000¢ (inclusive)",
            "upper bound:       \t        30.500¢ (inclusive)",
            "max ATE:           \t  2    ",
            "max AAS:           \t  3.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 58    ",
            "max 2,3-free copfr:\t  3    ",
            "max prime limit:   \t 37    ",
            "",
            "     \t      \t        \t \t  \t     \t       \t       \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \t       \t2,3-free\t2,3-free\t \t  \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma\t      \tquotient\t \t  \tmonzo\t       \t       \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \tapotome\tprime   \t   class\t \t  \t   \tclass   \tclass   \tclass   ",
            "class\tname  \t       n\t/\td \t     \t  2    \t  3    \t  5    \t  7    \t 11    \t 13    \t 17    \t 19    \t 23    \t 29    \t \tcents          \tslope  \tlimit   \t       n\t/\td \t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "     \t29/19C\t      58\t/\t57\t    [\t  1    \t -1    \t  0    \t  0    \t  0    \t  0    \t  0    \t -1    \t  0    \t  1    \t⟩\t        30.109¢\t -2.854\t 29     \t      29\t/\t19\t₂,₃\t  2     \t 48     \t295.907 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can set bounds by monzos and quotients instead of just cents", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --lower-bound 1594323/1548800 --upper-bound "[ -25  12   1   0   0   1 ⟩" --undirected --factoring-mode always --unabbreviated --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t[  -9  13  -2   0  -2 ⟩ (inclusive)",
            "upper bound:       \t[ -25  12   1   0   0   1 ⟩ (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t 47    ",
            "",
            "        \t                     \t        \t \t        \t     \t       \t       \t       \t       \t       \t       \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t  \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t                     \tquotient\t \t        \tmonzo\t       \t       \t       \t       \t       \t       \t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t  \t   \tclass   \tclass   \tclass   ",
            "class   \tname                 \t       n\t/\td       \t     \t  2    \t  3    \t  5    \t  7    \t 11    \t 13    \t 17    \t 19    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td \t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "  ,'/|) \t5⋅13-Medium-Diesis   \t34543665\t/\t33554432\t    [\t-25    \t 12    \t  1    \t  0    \t  0    \t  1    \t       \t       \t⟩\t        50.301¢\t  8.903\t  8.903\t 12    \t 13     \t      65\t/\t1 \t₂,₃\t  2     \t 18     \t 23.472 ",
            "        \t17:5⋅7-Medium-Diesis \t      35\t/\t34      \t    [\t -1    \t  0    \t  1    \t  1    \t  0    \t  0    \t -1    \t       \t⟩\t        50.184¢\t -3.090\t  3.090\t  0    \t 17     \t      35\t/\t17\t₂,₃\t  3     \t 29     \t 93.657 ",
            "        \t5²⋅11²-Medium-Diesis \t 1594323\t/\t1548800 \t    [\t -9    \t 13    \t -2    \t  0    \t -2    \t       \t       \t       \t⟩\t        50.152¢\t  9.912\t  9.912\t 13    \t 11     \t    3025\t/\t1 \t₂,₃\t  4     \t 32     \t231.076 ",
            "        \t19:5²⋅7-Medium-Diesis\t    4864\t/\t4725    \t    [\t  8    \t -3    \t -2    \t -1    \t  0    \t  0    \t  0    \t  1    \t⟩\t        50.195¢\t -6.091\t  6.091\t  3    \t 19     \t     175\t/\t19\t₂,₃\t  4     \t 36     \t292.477 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can format for a spreadsheet", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --lower-bound 50c --upper-bound 50.31c --sort-by apotomeSlope --table-format spreadsheet --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS} --factoring-mode never` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t50.000¢ (inclusive)",
            "upper bound:       \t50.310¢ (inclusive)",
            "max ATE:           \t15",
            "max AAS:           \t14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t61",
            "max 2,3-free copfr:\t555",
            "max prime limit:   \t47",
            "",
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t2,3-free\t2,3-free\t\t\t\t2,3-free\t2,3-free\t2,3-free",
            "comma\t\tquotient\t\t\tmonzo\t\t\t\t\t\t\t\t\t\t\tapotome\t\t\tprime\tclass\t\t\t\tclass\tclass\tclass",
            "class\tname\tn\t/\td\t \t2\t3\t5\t7\t11\t13\t17\t19\t \tcents\tslope\tAAS\tATE\tlimit\tn\t/\td\t₂,₃\tCoPFR\tSoPFR\tN2D3P9",
            "\t19/175M\t4864\t/\t4725\t[\t8\t-3\t-2\t-1\t0\t0\t0\t1\t⟩\t50.195¢\t-6.091\t6.091\t3\t19\t175\t/\t19\t₂,₃\t4\t36\t292.477",
            "\t35/17M\t35\t/\t34\t[\t-1\t0\t1\t1\t0\t0\t-1\t\t⟩\t50.184¢\t-3.090\t3.090\t0\t17\t35\t/\t17\t₂,₃\t3\t29\t93.657",
            "\t65M\t34543665\t/\t33554432\t[\t-25\t12\t1\t0\t0\t1\t\t\t⟩\t50.301¢\t8.903\t8.903\t12\t13\t65\t/\t1\t₂,₃\t2\t18\t23.472",
            "\t1/3025M\t1594323\t/\t1548800\t[\t-9\t13\t-2\t0\t-2\t\t\t\t⟩\t50.152¢\t9.912\t9.912\t13\t11\t3025\t/\t1\t₂,₃\t4\t32\t231.076",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("by default includes the bounds", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --lower-bound [] --upper-bound [-19,12] --max-prime-limit 3 --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t[  ⟩ (inclusive)",
            "upper bound:       \t[ -19  12 ⟩ (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t  3    ",
            "",
            "        \t    \t        \t \t      \t     \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t    \tquotient\t \t      \tmonzo\t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t \t   \tclass   \tclass   \tclass   ",
            "class   \tname\t       n\t/\td     \t     \t  2    \t  3    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td\t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            " (|//|) \t1u  \t       1\t/\t1     \t    [\t       \t       \t⟩\t         0.000¢\t  0.000\t  0.000\t  0    \t  1     \t       1\t/\t1\t₂,₃\t  0     \t  0     \t  1.000 ",
            "   '/|  \t3C  \t  531441\t/\t524288\t    [\t-19    \t 12    \t⟩\t        23.460¢\t 10.555\t 10.555\t 12    \t  1     \t       1\t/\t1\t₂,₃\t  0     \t  0     \t  1.000 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can exclude the bounds", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --exclusive --lower-bound [] --upper-bound [-19,12] --max-prime-limit 3 --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t[  ⟩ (exclusive)",
            "upper bound:       \t[ -19  12 ⟩ (exclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t  3    ",
            "",
            "(no results)",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("can exclude only one or the other of the bounds", (): void => {
        onlyRunInCi()

        const script = `npm run find-commas -- --exclusive true,false --lower-bound [] --upper-bound [-19,12] --max-prime-limit 3 --max-n2d3p9 ${OLD_MAX_N2D3P9_FOR_SHORTER_TEST_RESULTS} --max-ate ${OLD_MAX_ATE_FOR_SHORTER_TEST_RESULTS} --max-aas ${OLD_MAX_AAS_FOR_SHORTER_TEST_RESULTS}` as Io

        const actual = runScriptAndGetConsoleOutput(script)

        const expected = [
            "",
            "lower bound:       \t[  ⟩ (exclusive)",
            "upper bound:       \t[ -19  12 ⟩ (inclusive)",
            "max ATE:           \t 15    ",
            "max AAS:           \t 14.000",
            "max N2D3P9:        \t307.000",
            "max 2,3-free sopfr:\t 61    ",
            "max 2,3-free copfr:\t555    ",
            "max prime limit:   \t  3    ",
            "",
            "        \t    \t        \t \t      \t     \t       \t       \t \t               \t       \t       \t       \t2,3-free\t2,3-free\t \t \t   \t2,3-free\t2,3-free\t2,3-free",
            "comma   \t    \tquotient\t \t      \tmonzo\t       \t       \t \t               \tapotome\t       \t       \tprime   \t   class\t \t \t   \tclass   \tclass   \tclass   ",
            "class   \tname\t       n\t/\td     \t     \t  2    \t  3    \t \tcents          \tslope  \tAAS    \tATE    \tlimit   \t       n\t/\td\t₂,₃\tCoPFR   \tSoPFR   \tN2D3P9  ",
            "   '/|  \t3C  \t  531441\t/\t524288\t    [\t-19    \t 12    \t⟩\t        23.460¢\t 10.555\t 10.555\t 12    \t  1     \t       1\t/\t1\t₂,₃\t  0     \t  0     \t  1.000 ",
            "",
        ] as Io[]
        expect(actual).toEqual(expected)
    })
})
