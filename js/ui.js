export function populateDropdown(selectEl, units) {
    if (!selectEl) return;

    selectEl.innerHTML = "";

    const def = document.createElement("option");
    def.textContent = "-- Select Unit --";
    def.disabled = true;
    def.selected = true;
    selectEl.appendChild(def);

    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(opt);
    });
}
export function setActive(parentEl, clickedEl, selector) {
    if (!parentEl) return;

    parentEl.querySelectorAll(selector)
        .forEach(el => el.classList.remove("active"));

    clickedEl.classList.add("active");
}
export function showResult(value, unit) {
    const valEl = document.querySelector("#result-value");
    const unitEl = document.querySelector("#result-unit");

    if (!valEl || !unitEl) return;

    valEl.textContent = value;
    unitEl.textContent = unit || "";
}
export function renderHistory(records) {
    const list = document.querySelector("#history-list");
    list.innerHTML = "";

    if (!records.length) {
        list.innerHTML = "<li>No history yet.</li>";
        return;
    }

    records.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.expression} = ${r.result}`;
        list.appendChild(li);
    });
}