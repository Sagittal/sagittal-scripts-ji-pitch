import {
    abs,
    BLANK,
    COMMA,
    computeDecimalFromPev,
    computeQuotientFromPev,
    Exponent,
    formatQuotient,
    Formatted,
    isEmpty,
    Pev,
    Prime,
    Quotient,
    saveLog,
    sumPevs,
} from "@sagittal/general"

const PYTHAGOREAN_PEVS: Pev[] = [
    [54, -34],
    [53, -33],
    [51, -32],
    [50, -31],
    [48, -30],
    [46, -29],
    [45, -28],
    [43, -27],
    [42, -26],
    [40, -25],
    [39, -24],
    [37, -23],
    [35, -22],
    [34, -21],
    [32, -20],
    [31, -19],
    [29, -18],
    [27, -17],
    [26, -16],
    [24, -15],
    [23, -14],
    [21, -13],
    [20, -12],
    [18, -11],
    [16, -10],
    [15, -9],
    [13, -8],
    [12, -7],
    [10, -6],
    [8, -5],
    [7, -4],
    [5, -3],
    [4, -2],
    [2, -1],
    [0, 0],
    [-1, 1],
    [-3, 2],
    [-4, 3],
    [-6, 4],
    [-7, 5],
    [-9, 6],
    [-11, 7],
    [-12, 8],
    [-14, 9],
    [-15, 10],
    [-17, 11],
    [-19, 12],
    [-20, 13],
    [-22, 14],
    [-23, 15],
    [-25, 16],
    [-26, 17],
    [-28, 18],
    [-30, 19],
    [-31, 20],
    [-33, 21],
    [-34, 22],
    [-36, 23],
    [-38, 24],
    [-39, 25],
    [-41, 26],
    [-42, 27],
    [-44, 28],
    [-45, 29],
    [-47, 30],
    [-49, 31],
    [-50, 32],
    [-52, 33],
    [-53, 34],
] as Pev[]

const SAGITTAL_COMMA_PEVS: Pev[] = [
    [10, -6, 1, -1],
    [-10, 6, -1, 1],
    [-4, 4, -1],
    [4, -4, 1],
    [6, -2, 0, -1],
    [-6, 2, 0, 1],
    [-8, 8, -2],
    [8, -8, 2],
    [2, 2, -1, -1],
    [-2, -2, 1, 1],
    [-5, 1, 0, 0, 1],
    [5, -1, 0, 0, -1],
    [-6, 6, 0, 0, -1],
    [6, -6, 0, 0, 1],
    [-13, 5, 1, 1],
    [13, -5, -1, -1],
    [-3, -1, 2],
    [3, 1, -2],
    [-17, 9, 0, 1],
    [17, -9, 0, -1],
    [-7, 3, 1],
    [7, -3, -1],
    [-21, 13, -1, 1],
    [21, -13, 1, -1],
    [-11, 7],
    [11, -7],
    [-1, 1, 1, -1],
    [1, -1, -1, 1],
    [-15, 11, -1],
    [15, -11, 1],
    [-5, 5, 0, -1],
    [5, -5, 0, 1],
    [-19, 15, -2],
    [19, -15, 2],
    [-9, 9, -1, -1],
    [9, -9, 1, 1],
    [-16, 8, 0, 0, 1],
    [16, -8, 0, 0, -1],
    [-17, 13, 0, 0, -1],
    [17, -13, 0, 0, 1],
    [-24, 12, 1, 1],
    [24, -12, -1, -1],
    [-14, 6, 2],
    [14, -6, -2],
    [-28, 16, 0, 1],
    [28, -16, 0, -1],
    [-18, 10, 1],
    [18, -10, -1],
    [-32, 20, -1, 1],
    [32, -20, 1, -1],
    [-22, 14],
    [22, -14],
    [],
    [7, -4, 0, 1, -1],
    [-7, 4, 0, -1, 1],
    [-12, 5, 0, 0, 0, 0, 1],
    [12, -5, 0, 0, 0, 0, -1],
    [-1, -3, 1, 0, 1],
    [1, 3, -1, 0, -1],
    [-12, 8, 0, 1, -1],
    [12, -8, 0, -1, 1],
    [-2, 2, 1, 0, -1],
    [2, -2, -1, 0, 1],
    [-9, 5, -1, 0, 1],
    [9, -5, 1, 0, -1],
    [1, -1, 0, -1, 1],
    [-1, 1, 0, 1, -1],
    [-10, 10, -1, 0, -1],
    [10, -10, 1, 0, 1],
    [1, 2, 0, 0, 0, 0, -1],
    [-1, -2, 0, 0, 0, 0, 1],
    [-18, 11, 0, -1, 1],
    [18, -11, 0, 1, -1],
    [-4, 3, 0, 1, -1],
    [4, -3, 0, -1, 1],
    [-23, 12, 0, 0, 0, 0, 1],
    [23, -12, 0, 0, 0, 0, -1],
    [-12, 4, 1, 0, 1],
    [12, -4, -1, 0, -1],
    [-23, 15, 0, 1, -1],
    [23, -15, 0, -1, 1],
    [-13, 9, 1, 0, -1],
    [13, -9, -1, 0, 1],
    [-20, 12, -1, 0, 1],
    [20, -12, 1, 0, -1],
    [-10, 6, 0, -1, 1],
    [10, -6, 0, 1, -1],
    [-21, 17, -1, 0, -1],
    [21, -17, 1, 0, 1],
    [-10, 9, 0, 0, 0, 0, -1],
    [10, -9, 0, 0, 0, 0, 1],
    [-29, 18, 0, -1, 1],
    [29, -18, 0, 1, -1],
    [],
    [5, -6, 0, 0, 0, 0, 0, 0, 1],
    [-5, 6, 0, 0, 0, 0, 0, 0, -1],
    [-13, 7, -1, 0, 0, 0, 0, 1],
    [13, -7, 1, 0, 0, 0, 0, -1],
    [1, -2, -1, 0, 0, 0, 0, 0, 1],
    [-1, 2, 1, 0, 0, 0, 0, 0, -1],
    [-12, 9, 1, 0, 0, 0, 0, 0, -1],
    [12, -9, -1, 0, 0, 0, 0, 0, 1],
    [2, 0, 1, 0, 0, 0, 0, -1],
    [-2, 0, -1, 0, 0, 0, 0, 1],
    [-16, 13, 0, 0, 0, 0, 0, 0, -1],
    [16, -13, 0, 0, 0, 0, 0, 0, 1],
    [-6, 1, 0, 0, 0, 0, 0, 0, 1],
    [6, -1, 0, 0, 0, 0, 0, 0, -1],
    [-24, 14, -1, 0, 0, 0, 0, 1],
    [24, -14, 1, 0, 0, 0, 0, -1],
    [-10, 5, -1, 0, 0, 0, 0, 0, 1],
    [10, -5, 1, 0, 0, 0, 0, 0, -1],
    [-23, 16, 1, 0, 0, 0, 0, 0, -1],
    [23, -16, -1, 0, 0, 0, 0, 0, 1],
    [-9, 7, 1, 0, 0, 0, 0, -1],
    [9, -7, -1, 0, 0, 0, 0, 1],
    [-27, 20, 0, 0, 0, 0, 0, 0, -1],
    [27, -20, 0, 0, 0, 0, 0, 0, 1],
    [],
    [-9, 3, 0, 0, 0, 0, 0, 1],
    [9, -3, 0, 0, 0, 0, 0, -1],
    [-7, 7, 0, 0, 0, 0, -1],
    [7, -7, 0, 0, 0, 0, 1],
    [4, 2, 0, 0, -1, -1],
    [-4, -2, 0, 0, 1, 1],
    [-1, 2, 0, -2, 1],
    [1, -2, 0, 2, -1],
    [-10, 9, 0, 0, 0, 0, 0, -1],
    [10, -9, 0, 0, 0, 0, 0, 1],
    [-3, 1, 0, -1, 0, 0, 0, 1],
    [3, -1, 0, 1, 0, 0, 0, -1],
    [-4, -1, 0, 2],
    [4, 1, 0, -2],
    [-14, 6, 0, 0, 0, 0, 0, 0, 1],
    [14, -6, 0, 0, 0, 0, 0, 0, -1],
    [5, -4, -1, 0, 0, 1],
    [-5, 4, 1, 0, 0, -1],
    [4, -2, 0, 0, 1, 0, 0, -1],
    [-4, 2, 0, 0, -1, 0, 0, 1],
    [12, -4, 0, -2],
    [-12, 4, 0, 2],
    [-3, 4, 1, -2],
    [3, -4, -1, 2],
    [-23, 11, 0, 2],
    [23, -11, 0, -2],
    [-15, 9, 0, 0, -1, 0, 0, 1],
    [15, -9, 0, 0, 1, 0, 0, -1],
    [-16, 11, 1, 0, 0, -1],
    [16, -11, -1, 0, 0, 1],
    [],
    [3, 1, 0, 0, 0, 0, 0, 0, -1],
    [-3, -1, 0, 0, 0, 0, 0, 0, 1],
    [-7, 8, 0, -2],
    [7, -8, 0, 2],
    [-8, 6, 0, 1, 0, 0, 0, -1],
    [8, -6, 0, -1, 0, 0, 0, 1],
    [-1, -2, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, -1],
    [-10, 5, 0, 2, -1],
    [10, -5, 0, -2, 1],
    [-15, 5, 0, 0, 1, 1],
    [15, -5, 0, 0, -1, -1],
    [-4, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 0, 0, -1],
    [-2, 4, 0, 0, 0, 0, 0, -1],
    [2, -4, 0, 0, 0, 0, 0, 1],
    [-20, 10, 0, 0, 0, 0, 0, 1],
    [20, -10, 0, 0, 0, 0, 0, -1],
    [-18, 14, 0, 0, 0, 0, -1],
    [18, -14, 0, 0, 0, 0, 1],
    [-7, 9, 0, 0, -1, -1],
    [7, -9, 0, 0, 1, 1],
    [-12, 9, 0, -2, 1],
    [12, -9, 0, 2, -1],
    [-21, 16, 0, 0, 0, 0, 0, -1],
    [21, -16, 0, 0, 0, 0, 0, 1],
    [-14, 8, 0, -1, 0, 0, 0, 1],
    [14, -8, 0, 1, 0, 0, 0, -1],
    [-15, 6, 0, 2],
    [15, -6, 0, -2],
    [-25, 13, 0, 0, 0, 0, 0, 0, 1],
    [25, -13, 0, 0, 0, 0, 0, 0, -1],
    [-6, 3, -1, 0, 0, 1],
    [6, -3, 1, 0, 0, -1],
    [-7, 5, 0, 0, 1, 0, 0, -1],
    [7, -5, 0, 0, -1, 0, 0, 1],
    [1, 3, 0, -2],
    [-1, -3, 0, 2],
    [-14, 11, 1, -2],
    [14, -11, -1, 2],
    [-34, 18, 0, 2],
    [34, -18, 0, -2],
    [-26, 16, 0, 0, -1, 0, 0, 1],
    [26, -16, 0, 0, 1, 0, 0, -1],
    [-27, 18, 1, 0, 0, -1],
    [27, -18, -1, 0, 0, 1],
    [-8, 8, 0, 0, 0, 0, 0, 0, -1],
    [8, -8, 0, 0, 0, 0, 0, 0, 1],
    [-18, 15, 0, -2],
    [18, -15, 0, 2],
    [-19, 13, 0, 1, 0, 0, 0, -1],
    [19, -13, 0, -1, 0, 0, 0, 1],
    [-12, 5, 0, 0, 0, 0, 0, 1],
    [12, -5, 0, 0, 0, 0, 0, -1],
    [-21, 12, 0, 2, -1],
    [21, -12, 0, -2, 1],
    [-26, 12, 0, 0, 1, 1],
    [26, -12, 0, 0, -1, -1],
    [-15, 7, 0, 0, 0, 0, 1],
    [15, -7, 0, 0, 0, 0, -1],
    [-13, 11, 0, 0, 0, 0, 0, -1],
    [13, -11, 0, 0, 0, 0, 0, 1],
    [],
    [],
    [],
    [-15, 8, 1],
    [15, -8, -1],
    [],
    [12, -2, -1, -1, 0, -1],
    [-12, 2, 1, 1, 0, 1],
    [5, -3, 1, -1, -1, 1],
    [-5, 3, -1, 1, 1, -1],
    [],
    [-11, 0, -1, 2, 1, 0, 0, 1],
    [11, 0, 1, -2, -1, 0, 0, -1],
    [3, 6, 0, -3, 0, 0, -1],
    [-3, -6, 0, 3, 0, 0, 1],
    [12, -2, -1, -1, 0, -1],
    [-12, 2, 1, 1, 0, 1],
    [-4, -3, 2, -1, 2],
    [4, 3, -2, 1, -2],
    [-5, -1, -2, 4],
    [5, 1, 2, -4],
    [5, -3, 1, -1, -1, 1],
    [-5, 3, -1, 1, 1, -1],
    [-2, 5, -2, 1, 0, 0, -1],
    [2, -5, 2, -1, 0, 0, 1],
    [11, -7, -2, -1, 1, 0, 1],
    [-11, 7, 2, 1, -1, 0, -1],
    [17, -5, 0, -2, -1],
    [-17, 5, 0, 2, 1],
    [-13, 9, -1, 1, 1, 0, 0, 0, 0, 0, 0, -1],
    [13, -9, 1, -1, -1, 0, 0, 0, 0, 0, 0, 1],
    [],
    [-5, 1, 0, 0, 1],
    [5, -1, 0, 0, -1],
    [-16, 8, 0, 0, 1],
    [16, -8, 0, 0, -1],
] as Pev[]

SAGITTAL_COMMA_PEVS.forEach((commaPev: Pev): void => {
    const notatedPitches = [] as Array<Formatted<Quotient>>

    if (isEmpty(commaPev)) {
        saveLog(BLANK)
        return
    }

    PYTHAGOREAN_PEVS.forEach((pythagoreanPev: Pev): void => {
        const notatedPev = sumPevs(commaPev, pythagoreanPev)

        // Range for Sagittal-SMuFL-Map
        if (abs(notatedPev[1]) <= 2) {

            // Reduce to within octave
            while (computeDecimalFromPev(notatedPev) > 2) {
                notatedPev[0] = notatedPev[0] - 1 as Exponent<Prime>
            }
            while (computeDecimalFromPev(notatedPev) < 1) {
                notatedPev[0] = notatedPev[0] + 1 as Exponent<Prime>
            }

            notatedPitches.push(formatQuotient(computeQuotientFromPev(notatedPev)))
        }
    })

    saveLog(notatedPitches.join(COMMA))
})
