export function applyConversion(value, convObj) {
    if (isNaN(value)) throw new Error("Invalid number");

    if (convObj.factor !== null) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    const expr = convObj.formula.replace("x", value);
    return parseFloat(eval(expr).toFixed(6));
}