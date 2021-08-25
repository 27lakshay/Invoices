const URL = "http://localhost:5000/api/invoice";

export async function getInvoices() {
    try {
        let res = await fetch(URL + `/`);
        res = await res.json();
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function getLastInvoice() {
    try {
        let res = await fetch(URL + `/invoicecount`);
        res = await res.json();
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function getInvoice(id) {
    try {
        let res = await fetch(URL + `/${id}`);
        res = await res.json();
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function saveInvoice(body) {
    try {
        let reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        let res = await fetch(URL + `/add`, reqOptions);
        res = await res.json();
        return res;
    } catch (e) {
        console.log(e);
    }
}
