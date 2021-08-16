import React from 'react';
import Select from 'react-select';

function TrainerSelect(props) {
    const options = props.allTrainers;
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 10,
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
                <p>Loading...</p>
            ) : (
                <Select
                    isMulti
                    name="colors"
                    options={options}
                    value={props.trainers}
                    onChange={props.setTrainers}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                />
            )}
        </div>
    );
}

export default TrainerSelect;
