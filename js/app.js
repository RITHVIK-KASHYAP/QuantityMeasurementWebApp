import { getUnits } from "./api.js";
import { populateDropdown } from "./ui.js";

const state = {
    type: "Length"
};

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
