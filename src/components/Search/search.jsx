import React from "react";

import style from "./search.module.scss";
import { InputValueContext } from "../../App";
import debounce from "lodash.debounce";
const Search = () => {
  const [searchValue, updateSearchValue] = React.useState("");
  const { updateInputValue } = React.useContext(InputValueContext);
  
  const updateSearch = React.useMemo(() =>
    debounce((str) => updateInputValue(str), 250),
    [updateInputValue]
  );

  const inputRef = React.useRef();

  return (
    <div className={style.search__wrap}>
      <svg
        className={style.search__icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        className={style.search}
        value={searchValue}
        onChange={(event) => {
          updateSearchValue(event.target.value);
          updateSearch(event.target.value);
          console.log(event)
        }}
        type="text"
      />
      {searchValue && (
        <svg
          className={style.close}
          onClick={() => {
            updateSearchValue("");
            updateInputValue("");
            
            inputRef.current.focus();
          }}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
