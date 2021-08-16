import React, {useState} from 'react';

function ModuleInput(props) {
    const [value, setValue] = useState(props.value)
    return (
        <div>
            <input className={props.className} name={props.name} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
}

export default ModuleInput;
