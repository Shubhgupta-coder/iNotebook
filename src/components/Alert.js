import React from 'react'

export default function Alert(props) {

    const capitalise = (word) => {
      if(word==="danger"){
        word="error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div>
            {/* we should  wvaluvate only when we do not have NULL in alert */}
            <div style={{height:'50px'}}>
            {props.alert ? (<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalise(props.alert.type)}</strong>:{props.alert.msg}
            </div>) : ""
            }
            </div>

        </div>
    )
}
