import React from 'react'
import Result from './Result'

function Results(props) {
    return (
        <section className='results'>
            {
                <Result
                    key={props.results}
                    result={props.results}
                />
            }
        </section>
    )
}

export default Results