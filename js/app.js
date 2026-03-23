import { getUnits } from "./api.js";
import { populateDropdown } from "./ui.js";

const state = {
    type: "Length"
};
document.querySelector("#from-value").addEventListener("input", calculate);
document.querySelector("#from-unit").addEventListener("change", calculate);
document.querySelector("#to-unit").addEventListener("change", calculate);

document.addEventListener("DOMContentLoaded", async () => {

    const fromSelect = document.querySelector("#from-unit");
    const toSelect = document.querySelector("#to-unit");

    const units = await getUnits("Length");

    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);

});
import { setActive } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    const typeSelector = document.querySelector("#type-selector");
    const fromSelect = document.querySelector("#from-unit");
    const toSelect = document.querySelector("#to-unit");

    const units = await getUnits(state.type);
    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);

    document.querySelectorAll(".type-card").forEach(card => {
        card.addEventListener("click", async () => {

            state.type = card.dataset.type;

            setActive(typeSelector, card, ".type-card");

            const units = await getUnits(state.type);

            populateDropdown(fromSelect, units);
            populateDropdown(toSelect, units);
        });
    });

});
import { getConversion } from "./api.js";
import { applyConversion } from "./conversion.js";
import { showResult } from "./ui.js";

async function calculate() {
    try {
        const fromVal = parseFloat(document.querySelector("#from-value").value);
        const fromUnit = document.querySelector("#from-unit").value;
        const toUnit = document.querySelector("#to-unit").value;

        if (!fromVal || !fromUnit || !toUnit) return;

        const conv = await getConversion(fromUnit, toUnit);

        const res = applyConversion(fromVal, conv);

        showResult(res, toUnit);

    } catch (e) {
        showResult("Error: " + e.message, "");
    }
}

import { saveHistory, getHistory } from "./api.js";
import { renderHistory } from "./ui.js";

async function calculate() {
    try {
        const fromVal = parseFloat(document.querySelector("#from-value").value);
        const fromUnit = document.querySelector("#from-unit").value;
        const toUnit = document.querySelector("#to-unit").value;

        if (!fromVal || !fromUnit || !toUnit) return;

        const conv = await getConversion(fromUnit, toUnit);
        const res = applyConversion(fromVal, conv);

        showResult(res, toUnit);

        const record = {
            type: state.type,
            action: "Conversion",
            expression: `${fromVal} ${fromUnit} → ${toUnit}`,
            result: res,
            timestamp: new Date().toISOString()
        };

        await saveHistory(record);
        renderHistory(await getHistory());

    } catch (e) {
        showResult("Error: " + e.message, "");
    }
}