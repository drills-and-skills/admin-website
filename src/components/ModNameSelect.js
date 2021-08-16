import React from 'react';
import Select from 'react-select';

function ModNameSelect(props) {
    const options = props.allModules;
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted black',
            color: state.isSelected ? 'red' : 'blue',
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 200,
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return {...provided, opacity, transition};
        },
    };

    return (
        <div>
            {props.isLoading ? (
                <p>Loading</p>
            ) : (
                <Select
                    align="center"
                    name="colors"
                    options={options}
                    label="Single select"
                    value={props.module}
                    onChange={props.setModule}
                    styles={customStyles}
                />
            )}
        </div>
    );
}

export default ModNameSelect;
