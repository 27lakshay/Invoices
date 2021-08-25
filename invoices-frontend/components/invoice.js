import styling from "../styles/modules/invoice.module.scss";

export default function Invoice({ data }) {
    // function printInvoice(divName) {
    //     var printContents = document.getElementById(divName).innerHTML;
    //     let printWin = window.open("", "printSpecial");
    //     printWin.document.open();
    //     printWin.document.write(printContents);
    //     printWin.document.close();
    //     printWin.print();
    // }
    return (
        <>
            {data && (
                <section id="print-content" className={styling.invoice__details__wrapper}>
                    <h4
                        style={{
                            color: "rgba(196, 201, 210, 1)",
                            fontWeight: "600",
                            fontSize: "16px",
                        }}
                    >
                        INVOICE DETAILS
                    </h4>
                    <div className={styling.invoice__details}>
                        <div className={styling.invoice__details__header}>
                            <div>
                                <p>INVOICE</p>
                                <p># INV{data.invoice_no}</p>
                                <p>{data.createdAt.substr(0, data.createdAt.indexOf("T"))}</p>
                            </div>
                            <div>
                                <p>CUSTOMER DETAILS</p>
                                <p>{data.full_name}</p>
                                <p>{data.email}</p>
                            </div>
                            <div>
                                {/* <button className={styling.invoice__print} onClick={() => printInvoice("print-content")}>
                                    PRINT
                                    <img src="/icons/printer-blue@3x.png" />
                                </button> */}
                            </div>
                        </div>
                        <table className={styling.invoice__details__table}>
                            <thead className={styling.table__header}>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price - &#x20b9;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.item_name}</td>
                                        <td>{item.item_quantity}</td>
                                        <td>{item.item_cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>Sub Total</td>
                                    <td>&#x20b9; {data.sub_total}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Tax</td>
                                    <td>{data.tax}%</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Discount</td>
                                    <td>{data.discount}%</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Grand Total</td>
                                    <td>&#x20b9; {data.grand_total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            )}
        </>
    );
}
