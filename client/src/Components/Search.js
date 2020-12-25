import React from 'react';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';


function Search(props){

    const { searchValue, handleSearch, handleSearchSubmit } = props;

    return(
        <div>
            <form onSubmit={handleSearchSubmit}>
                <div className="search-container">
                    <input 
                        className="search-container-input-field" 
                        type="text" 
                        value = { searchValue }
                        onChange = { handleSearch }
                        placeholder="Search" 
                    />
                    <button className="search-icon-container">
                        <SearchTwoToneIcon className="search-container-search-icon"/>
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Search