import { useState, useEffect } from "react";
import styling from "../../styles/modules/productDetailsForm.module.scss";

export default function ProductDetails({ prev, invoiceDetails, setInvoiceDetails, saveNewInvoice }) {
    const [tempItem, setTempItem] = useState({
        item_name: "",
        item_quantity: "",
        item_cost: "",
    });
    const [editingItem, setEditingItem] = useState(undefined);

    // Add item if user input in not empty
    function addNewItem() {
        if (tempItem) {
            if (tempItem.item_name !== "" && tempItem.item_quantity !== "" && tempItem.item_cost !== "") {
                let newItem = {
                    item_name: tempItem.item_name,
                    item_quantity: parseInt(tempItem.item_quantity),
                    item_cost: parseInt(tempItem.item_cost),
                };
                let listOfItems = [...invoiceDetails.items];
                listOfItems.push(newItem);
                setInvoiceDetails({ ...invoiceDetails, items: listOfItems });
                // reset state
                setTempItem({
                    item_name: "",
                    item_quantity: "",
                    item_cost: "",
                });
                let el = document.getElementById("tableBody");
                el.scrollTop = el.scrollHeight;
                return;
            }
        }
        alert("Please fill item details before adding.");
    }
    function inputHandler(e) {
        setTempItem({ ...tempItem, [e.target.name]: e.target.value });
    }
    function checkstate() {
        console.log(invoiceDetails);
        console.log(tempItem);
        console.log(editingItem);
    }

    function editItem(itemid) {
        setEditingItem((editingItem) => (editingItem = itemid));
        let item = invoiceDetails.items[itemid];
        let oldItem = {
            item_name: item.item_name,
            item_quantity: item.item_quantity,
            item_cost: item.item_cost,
        };
        setTempItem(oldItem);
    }

    function saveEditedItem(itemid) {
        if (tempItem.item_name !== "" && tempItem.item_quantity !== "" && tempItem.item_cost !== "") {
            let editedItem = {
                item_name: tempItem.item_name,
                item_quantity: parseInt(tempItem.item_quantity),
                item_cost: parseInt(tempItem.item_cost),
            };
            let listOfItems = [...invoiceDetails.items];
            listOfItems[itemid] = editedItem;
            setInvoiceDetails((invoiceDetails) => (invoiceDetails = { ...invoiceDetails, items: listOfItems }));
            setTempItem({
                item_name: "",
                item_quantity: "",
                item_cost: "",
            });
            setEditingItem((editingItem) => (editingItem = undefined));
            return;
        }
        alert("Please fill item details to finish editing.");
    }
    function deleteItem(itemid) {
        let listOfItems = [...invoiceDetails.items];
        if (itemid > -1) {
            listOfItems.splice(itemid, 1);
        }
        setInvoiceDetails({ ...invoiceDetails, items: listOfItems });
    }
    function calculateSubTotal() {
        let sub_total = invoiceDetails.items.length > -1 ? invoiceDetails.items.reduce((prev, cur) => cur.item_cost * cur.item_quantity + prev, 0) : null;
        console.log(sub_total);
        setInvoiceDetails(
            (prevState) => ({
                ...prevState,
                sub_total: sub_total,
            }),
            calculateGrandTotal(sub_total, invoiceDetails.tax, invoiceDetails.discount)
        );
    }
    function calculateGrandTotal(subTotal, tax, discount) {
        let grand_total = subTotal;
        if (tax) grand_total += (tax / 100) * grand_total;
        if (discount) grand_total -= (discount / 100) * grand_total;
        setInvoiceDetails((prevState) => ({
            ...prevState,
            grand_total: grand_total,
        }));
    }

    useEffect(() => {
        calculateSubTotal();
    }, [invoiceDetails.items.length]);

    useEffect(() => {
        calculateSubTotal();
    }, [editingItem]);

    return (
        <>
            <div className={styling.productdetailsform__body}>
                <div className={styling.productdetailsform__header}>
                    <p>Product Details</p>
                    {/* <button onClick={() => checkstate()}>checkstate</button> */}
                    <span>
                        <p>Customer Details</p>
                        <p>{invoiceDetails.full_name}</p>
                        <p>{invoiceDetails.email}</p>
                    </span>
                    <button type="button" className={styling.item__button} onClick={() => prev()}>
                        <img src="/icons/edit@3x.png" />
                    </button>
                </div>
                <div className={styling.invoice__details__table}>
                    <div className={styling.table__header}>
                        <label>Item</label>
                        <label>Quantity</label>
                        <label>Price</label>
                    </div>
                    <div id="tableBody" className={styling.table__body}>
                        {invoiceDetails.items.map((item, index) => (
                            <div className={styling.item__wrapper}>
                                <div key={index} className={styling.item__details}>
                                    <label className={styling.table__body__cells}>{item.item_name}</label>
                                    <label className={styling.table__body__cells}>{item.item_quantity}</label>
                                    <label className={styling.table__body__cells}>{item.item_cost}</label>
                                </div>
                                <div className={styling.item__options}>
                                    <button className={styling.item__button} onClick={() => editItem(index)}>
                                        <img src="/icons/edit@2x.png" />
                                    </button>
                                    <button className={styling.item__button} onClick={() => deleteItem(index)}>
                                        <img src="/icons/trash-icon-red.png" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styling.table__footer}>
                        <input
                            className={styling.table__body__cells}
                            type="text"
                            placeholder="Enter Item Name"
                            name="item_name"
                            value={tempItem.item_name || ""}
                            onChange={(e) => inputHandler(e)}
                        />
                        <input
                            className={styling.table__body__cells}
                            type="number"
                            placeholder="0.00"
                            name="item_quantity"
                            value={tempItem.item_quantity || ""}
                            onChange={(e) => inputHandler(e)}
                        />
                        <div className={styling.cell_with_button}>
                            <input
                                className={styling.table__body__cells}
                                type="number"
                                placeholder="0.00"
                                name="item_cost"
                                value={tempItem.item_cost || ""}
                                onChange={(e) => inputHandler(e)}
                            />
                            <button
                                className={styling.item__button}
                                type="button"
                                onClick={() => (editingItem !== undefined ? saveEditedItem(editingItem) : addNewItem())}
                            >
                                <img src="/icons/enter-icon@3x.png" />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        <input
                            type="number"
                            name="tax"
                            value={invoiceDetails.tax || ""}
                            onChange={(e) =>
                                setInvoiceDetails((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: parseInt(e.target.value),
                                }))
                            }
                            placeholder="Tax"
                        />
                    </span>
                    <span>
                        <input
                            type="number"
                            name="discount"
                            value={invoiceDetails.discount || ""}
                            onChange={(e) =>
                                setInvoiceDetails((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: parseInt(e.target.value),
                                }))
                            }
                            placeholder="Discount"
                        />
                    </span>
                    <label>Sub Total</label>
                    <label style={{ color: "#000" }}>&#x20b9; {invoiceDetails.sub_total}</label>
                </div>
            </div>
            <div className={styling.productdetailsform__footer}>
                <span>
                    <p>Tax</p>
                    <p>{invoiceDetails.tax}%</p>
                </span>
                <span>
                    <p>Discount</p>
                    <p>{invoiceDetails.discount}%</p>
                </span>
                <span>
                    <p>Grand Total</p>
                    <p>&#x20b9; {invoiceDetails.grand_total}</p>
                </span>
                <button onClick={() => saveNewInvoice(invoiceDetails)}>Save</button>
            </div>
        </>
    );
}
