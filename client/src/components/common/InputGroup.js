import React  from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';

const InputGroup=({

    name,
    placeholder,
    value,
     type,
    error,
    icon,
  
    onChange,
   
})=>{


        return (
             <div className="input-group mb-3">
             <div className="input-group-prepend">
             <span class="input-group-text" id="basic-addon1">
             <i className={icon}/>
             </span>
              <input type={type}
                      className={classnames("form-control  form-control-lg",
                      {'is-invalid':error})} 
                      placeholder={placeholder}
                      name={name}
                      value={value} 
                      onChange={onChange}
                      />
          
            {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
            </div>
        )
    
}
InputGroup.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string,
    icon:PropTypes.string,
    error:PropTypes.string,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    
}
InputGroup.defaultProps={
  type:'text'
}
export default InputGroup;