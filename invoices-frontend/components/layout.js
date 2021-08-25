import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="page__wrapper">
                <Sidebar />
                <main className="main__wrapper">{children}</main>
            </div>
            {/* <Footer /> */}
        </>
    );
}
