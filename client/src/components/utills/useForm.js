import { useState, useEffect } from "react";
const useForm = (callback, validate) => {
  const [values, setValues] = useState({ diet: [], category: [], image: [] });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name == 'diet') {
      if (values.diet.includes(value)) {
        const newDiet = values.diet.filter(item => item !== value);
        const diet = newDiet;
        values.diet = diet
        const newVal = values
        setValues(newVal)
      } else {
        values.diet.push(value)
        const diet = [...values.diet]
        setValues({ ...values, diet })
      }
    } else if (e.target.name === 'image') {
      setValues({ ...values, image: e.target.files })
    } else if (e.target.name == 'category') {
      if (values.category.includes(value)) {
        console.log(values.category);
        const newCat = values.category.filter(item => item !== value);
        const category = newCat;
        values.category = category
        const newVal = values
        setValues(newVal)
      } else {
        values.category.push(value)
        const category = [...values.category]
        setValues({ ...values, category })
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  console.log('values', values);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    // callback()

  };
  useEffect(() => {
    for (const key in errors) {
      if (!!errors[key].length) return;
    }
    callback();
  }, [errors]);
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
