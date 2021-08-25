import SearchBar from "./searchBar";
import Link from "next/link";
import styling from "../styles/modules/sidebar.module.scss";
import { useGlobalContext } from "../utils/globalContext";

export default function Sidebar() {
    const { invoices } = useGlobalContext();
    return (
        <section className={styling.sidebar}>
            <SearchBar />
            <div>
                <h6 className={styling.invoice__count}>
                    INVOICES - <span>{invoices && invoices.length}</span>
                </h6>
                <ul className={styling.sidebar__menu__options}>
                    {invoices && invoices.length > 0
                        ? invoices.map((invoice) => (
                              <Link key={invoice.invoice_no} href={`/invoice/${invoice.invoice_no}`}>
                                  <li className={styling.menu__option}>
                                      <div className={styling.option__details__left}>
                                          <p className={styling.detail__invoice_number}>INV. # - {invoice.invoice_no}</p>
                                          <p className={styling.detail__no_of_items}>Items - {invoice.items.length}</p>
                                          <p className={styling.detail__customer_name}>{invoice.full_name}</p>
                                      </div>
                                      <div className={styling.option__details__right}>
                                          <p className={styling.detail__time_and_date}>{invoice.createdAt.substr(0, invoice.createdAt.indexOf("T"))}</p>
                                          <p className={styling.detail__cost}>&#x20b9; {invoice.grand_total}</p>
                                      </div>
                                  </li>
                              </Link>
                          ))
                        : "No Invoices Added"}
                </ul>
            </div>
        </section>
    );
}
