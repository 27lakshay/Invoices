import styling from "../../styles/modules/customerDetailsForm.module.scss";

export default function CustomerDetails({ next, invoiceDetails, setInvoiceDetails }) {
    function inputHandler(e) {
        setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
    }

    function submitCustomerDetails(e) {
        e.preventDefault();
        next();
        console.log("submit");
    }
    return (
        <>
            <div className={styling.customerdetailsform__body}>
                <div>
                    <span>Customer Details</span>
                    <button onClick={() => next()}>
                        SKIP
                        <img src="/icons/skip-icon@2x.png" />
                    </button>
                </div>
                <form onSubmit={(e) => submitCustomerDetails(e)}>
                    <div className={styling.customerdetailsform__left}>
                        <div className={styling.formControl__wrapper}>
                            <label className={styling.formControl__label}>
                                Full Name<sup>*</sup>
                            </label>
                            <input
                                className={styling.formControl__input}
                                placeholder="Customer Name"
                                name="full_name"
                                type="text"
                                required
                                value={invoiceDetails.full_name}
                                onChange={(e) => inputHandler(e)}
                            ></input>
                        </div>
                        <div className={styling.formControl__wrapper}>
                            <label className={styling.formControl__label}>
                                Address<sup>*</sup>
                            </label>
                            <textarea
                                className={styling.formControl__input}
                                placeholder="Customer Address"
                                name="address"
                                type="text"
                                required
                                value={invoiceDetails.address}
                                onChange={(e) => (e.target.value.length > 120 ? e.stopPropagation() : inputHandler(e))}
                            ></textarea>
                        </div>
                    </div>
                    <div className={styling.customerdetailsform__right}>
                        <div className={styling.formControl__wrapper__phone}>
                            <label className={styling.formControl__label}>
                                Phone Number<sup>*</sup>
                            </label>
                            <span>
                                <label>+91</label>
                                <input
                                    className={styling.formControl__input}
                                    placeholder="Customer Contact Number"
                                    name="phone_no"
                                    type="number"
                                    required
                                    value={invoiceDetails.phone_no}
                                    onChange={(e) => (e.target.value.length > 10 ? e.stopPropagation() : inputHandler(e))}
                                />
                            </span>
                        </div>
                        <div className={styling.formControl__wrapper}>
                            <label className={styling.formControl__label}>
                                Email ID<sup>*</sup>
                            </label>
                            <input
                                className={styling.formControl__input}
                                placeholder="Customer Email Address"
                                name="email"
                                type="email"
                                required
                                value={invoiceDetails.email}
                                onChange={(e) => inputHandler(e)}
                            ></input>
                            <label style={{ fontSize: "14px", opacity: "0.5" }}>Ex: example@gmail.com</label>
                        </div>
                        <div className={styling.formControl__wrapper}>
                            <label className={styling.formControl__label}>
                                Pincode<sup>*</sup>
                            </label>
                            <input
                                className={styling.formControl__input}
                                placeholder="123456"
                                name="pincode"
                                type="number"
                                required
                                value={invoiceDetails.pincode}
                                onChange={(e) => (e.target.value.length > 6 ? e.stopPropagation() : inputHandler(e))}
                            ></input>
                        </div>
                    </div>
                    <input type="submit" id="submit-form" style={{ display: "none" }} />
                </form>
            </div>
            <div className={styling.customerdetailsform__footer}>
                <label for="submit-form" tabIndex="0">
                    Proceed
                </label>
            </div>
        </>
    );
}
