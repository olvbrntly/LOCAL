import Form from 'react-bootstrap/Form';



const StateOptions = ({onStateChanged}) =>{

    const options =[
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'DC',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VI',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
    ]
    return(
        <>
            <Form.Label>State</Form.Label>
            <Form.Select onChange={(e) => onStateChanged(e.target.value)}>
                <option disabled selected value> -- select an option -- </option>
                {options.map((option) =>(
                    <option key={option}>{option}</option>
                ))}
            </Form.Select>
        </>
    )
 
}

export default StateOptions