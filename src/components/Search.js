import React from 'react'


function Search(props) {
    return (
        <section className='search-box-wrapper'>
            {
                <input
                    placeholder='Enter Cat'
                    type='text'
                    className='search-box'
                    onChange={props.handleInput}
                    onKeyPress={props.search}
                />
            }
        </section>
    )
}

export default Search