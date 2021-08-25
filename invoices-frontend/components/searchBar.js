import styling from "../styles/modules/searchBar.module.scss";

export default function SearchBar() {
    return (
        <div className={styling.searchbar}>
            <span className={styling.search__input__wrapper}>
                <img src="/icons/search-icon@2x.png" />
                <input className={styling.search__input} placeholder="Search..."></input>
            </span>
        </div>
    );
}
