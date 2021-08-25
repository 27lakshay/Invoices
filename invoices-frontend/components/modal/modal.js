import { useEffect, useState } from "react";

import styling from "../../styles/modules/modal.module.scss";
import ClientOnlyPortal from "./ClientOnlyPortal";
import CustomerDetails from "./customerDetails";
import ProductDetails from "./productDetails";
import { getLastInvoice, saveInvoice } from "../../utils/requests";
import { useGlobalContext } from "../../utils/globalContext";

export default function Modal({ open, setOpen }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [invoiceDetails, setInvoiceDetails] = useState({
        items: [],
        sub_total: undefined,
        grand_total: undefined,
        tax: undefined,
        discount: undefined,
    });
    const DETAILS_RESET = {
        items: [],
        sub_total: undefined,
        grand_total: undefined,
        tax: undefined,
        discount: undefined,
    };
    const { updateInvoices } = useGlobalContext();
    function next() {
        setCurrentStep((currentStep) => currentStep + 1);
    }

    function prev() {
        setCurrentStep((currentStep) => currentStep - 1);
    }

    function closeModal() {
        setInvoiceDetails(DETAILS_RESET);
        setCurrentStep((currentStep) => (currentStep = 1));
        setOpen(false);
    }

    async function setNewInvoiceNumber() {
        let res = await getLastInvoice();
        if (res.last_invoice === undefined) {
            setInvoiceDetails({ ...invoiceDetails, invoice_no: 1 });
            return;
        }
        setInvoiceDetails({ ...invoiceDetails, invoice_no: res.last_invoice.invoice_no + 1 });
    }
    useEffect(() => {
        setNewInvoiceNumber();
    }, [open]);

    async function saveNewInvoice(invoiceDetails) {
        if (invoiceDetails.items.length > 0) {
            await saveInvoice(invoiceDetails);
            await updateInvoices();
            closeModal();
            return;
        }
        alert("PLease fill in the details to save the invoice.");
    }

    return (
        <>
            {open && (
                <ClientOnlyPortal selector="#modal">
                    <div className={styling.backdrop}>
                        <div className={styling.modal}>
                            <div className={styling.modal__head}>
                                <span>Create new Invoice</span>
                                <span>ORDER NO: {invoiceDetails.invoice_no}</span>
                                <button className={styling.modal__closeBtn} type="button" onClick={() => closeModal()}></button>
                            </div>
                            {currentStep === 1 ? (
                                <CustomerDetails next={next} prev={prev} invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails} />
                            ) : currentStep === 2 ? (
                                <ProductDetails
                                    next={next}
                                    prev={prev}
                                    invoiceDetails={invoiceDetails}
                                    setInvoiceDetails={setInvoiceDetails}
                                    saveNewInvoice={saveNewInvoice}
                                />
                            ) : null}
                        </div>
                    </div>
                </ClientOnlyPortal>
            )}
        </>
    );
}
