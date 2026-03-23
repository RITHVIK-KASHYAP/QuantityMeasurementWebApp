const BASE_URL = "http://localhost:5500";

export async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error("Error fetching units:", e);
        return [];
    }
}
export async function getConversion(from, to) {
    const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);
    const data = await res.json();

    if (!data.length) throw new Error("No conversion found");

    return data[0];
}
export async function saveHistory(record) {
    try {
        const res = await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record)
        });
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}