import React, { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { getLastInvoice, getInvoices } from "./requests";

const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
    const [invoices, setInvoices] = useState([]);
    const updateInvoices = async () => {
        let res = await getLastInvoice();
        let oldinvoices = [...invoices];
        oldinvoices.push(res.last_invoice);
        setInvoices(oldinvoices);
    };
    useEffect(() => {
        (async () => {
            let res = await getInvoices();
            setInvoices(res.invoices);
        })();
    }, []);

    const value = { updateInvoices, invoices };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
