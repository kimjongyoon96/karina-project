// import React, { createContext, useState, useContext, ReactNode } from "react";
// import { karinaData } from "../../types/contentType";

// interface searchResultContextType {
//   searchResults: karinaData[];
//   setSearchResults: (results: karinaData[]|null) => void;
//   searchQuery:string;
//   setSearchQuery:(query:string)=>void;

// const SearchResultContext = createContext<searchResultContextType | undefined>(
//   undefined
// );

// export const SearchResultProvider :React.FC<{children:ReactNode}>=({children})=>{
//     const [searchResults, setSearchResults] = useState<karinaData[]>([]);
//     const [searchQuery,setSearchQuery]=useState('')

//     const whatIsArray =()=>{
//         const foundItems =searchResults.filter((item)=>item.title===searchQuery);
//         if(foundItems.length>1){
//             console.log("매치되는 검색결과가 있습니다.")
//             setSearchResults(foundItems);
//         }else{
//             console.log("데이터가 없습니다.").
//             alert();
//         }
//     }
//   const value = { searchResults,setSearchResults };

//      return(
//         <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults, setSearchResults, performSearch }}>
//         {children}
//       </SearchContext.Provider>
//     );
// };

// export const useSearch = () => {
//     const context = useContext(SearchContext);
//     if (!context) throw new Error('useSearch must be used within a SearchProvider');
//     return context;
//   };
