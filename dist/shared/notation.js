import { notation } from "./constants.js";
/**returns indexposition of a square on the checkersboard and vice-versa. */
export function convertNotation(x, y) {
    if (typeof y === "number") {
        return notation[x][y];
    }
    validateMove(notation, x);
    const xPos = notation.findIndex((row) => row.includes(x));
    const yPos = notation[xPos].findIndex((col) => col === x);
    return [xPos, yPos];
}
export function ensureArray(fromIndex) {
    if (Array.isArray(fromIndex)) {
        return fromIndex;
    }
    else {
        throw new Error("fromIndex is not an array");
    }
}
export function ensureNumber(move) {
    let fromNum = parseInt(move);
    let fromIndex = convertNotation(fromNum);
    return ensureArray(fromIndex);
}
function validateMove(notation, ...numbers) {
    for (const num of numbers) {
        let found = false;
        for (const innerArray of notation) {
            if (innerArray.includes(num)) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`${num} is niet aanwezig op bord en dus geen geldige zet!.`);
        }
    }
}
//# sourceMappingURL=notation.js.map