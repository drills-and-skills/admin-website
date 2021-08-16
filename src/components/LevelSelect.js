import React from 'react';
import Select from 'react-select';

function LevelSelect(props) {
    const options = props.allLevels;
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
            ) : (<div>
                {console.log(options)}
                    <Select
                        align="center"
                        name="colors"
                        options={options}
                        label="Single select"
                        value={props.moduleLevel}
                        onChange={props.setModuleLevel}
                        styles={customStyles}
                    />
                </div>
            )}
        </div>
    );
}

export default LevelSelect;
