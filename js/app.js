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
