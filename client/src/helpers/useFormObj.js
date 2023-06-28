import { useState } from "react";

const useForm = (initialFieldValues,setCurrentObj) => {

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm =() =>{
        setValues(initialFieldValues)
        setErrors({})
        setCurrentObj({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;