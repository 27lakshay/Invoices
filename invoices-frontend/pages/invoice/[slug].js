import Invoice from "../../components/invoice";
import { getInvoice } from "../../utils/requests";

export default function InvoiceDetails(props) {
    return <Invoice data={props.data} />;
}

export async function getServerSideProps(ctx) {
    var initialProps = {
        slug: "",
        data: [],
    };
    let slug = ctx["query"]["slug"];
    initialProps.slug = slug;

    let res = await getInvoice(slug);
    res.invoice ? (initialProps.data = res.invoice) : null;

    return { props: initialProps };
}
