import { FunctionComponent, useState } from "react";

import { GoSearch } from "react-icons/go";

interface SearchBoxProps {

}



const SearchBox: FunctionComponent<SearchBoxProps> = (props: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (key: string) => {
    console.log(key);
  }

  const icon = <GoSearch size={30} onClick={() => console.log("hi")} lightingColor={"black"}/>;

  const searchBoxCSS = "search-box" + (isFocused ? " focus" : "");
  const placeholder = isFocused ? "" : "Query";
  console.log(isFocused, searchBoxCSS);
  return (
    <div className={searchBoxCSS} tabIndex={0}>
      <input type="text" className="search-input" placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => handleKeyPress(e.key)}
      />
      <div className="search-icon" tabIndex={1}>
        {icon}
      </div>

    </div>
  );
}

export default SearchBox;