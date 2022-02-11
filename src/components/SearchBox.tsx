import { FunctionComponent, useState } from "react";

import { GoSearch } from "react-icons/go";

interface SearchBoxProps {

}



const SearchBox: FunctionComponent<SearchBoxProps> = (props: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (key: string) => {
    console.log(key);
  }

  const css = "search-box" + (isFocused ? " focus" : "");
  const placeholder = isFocused ? "" : "Query";
  console.log(isFocused, css);
  return (
    <div className={css} tabIndex={0}>
      <input type="text" className="search-input" placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => handleKeyPress(e.key)}
      />
      <GoSearch size={30} />
    </div>
  );
}

export default SearchBox;