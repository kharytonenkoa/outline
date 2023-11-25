import { AiOutlineSearch } from "react-icons/ai"

const Search = () => {
    return ( 
    <div className="fixed left-[30%] w-[40%] hidden h-[35px] bg-black/10 border border-input backdrop-blur-2xl rounded-lg lg:flex md:flex sm:flex justify-between items-center pl-3 text-sm font-regular text-white/80">
        <p>Search</p>
        <div className="w-[50px] h-full flex justify-center items-center bg-neutral-800/50 rounded-r-lg cursor-pointer hover:bg-neutral-700">
        <AiOutlineSearch className="w-[20px] h-[16px]"/>
        </div>
    </div> 
    );
}
 
export default Search;