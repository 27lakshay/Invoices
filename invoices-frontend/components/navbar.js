import { useState } from "react";

import styling from "../styles/modules/navbar.module.scss";
import AddInvoiceModal from "./modal/modal";

export default function Navbar() {
    const [open, setOpen] = useState();
    return (
        <nav className={styling.navbar}>
            <span>Dashboard</span>
            <button className={styling.add_invoice} type="button" onClick={() => setOpen(true)}>
                +
            </button>
            <AddInvoiceModal open={open} setOpen={setOpen} />
        </nav>
    );
}
