import { useState } from "react"
import { useSearch } from "../../context/Search"
export default function SearchForm(){
    //context

    const [search,setSearch]=useSearch()
    return (
        <>
     search form
        </>
    )
}