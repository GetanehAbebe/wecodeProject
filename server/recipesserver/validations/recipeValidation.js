const Yup = require('yup')
const RecipeSchema = Yup.object({
    name: Yup.string()
        .min(3, '')
        .max(15)
        .required('please enter'),
    isPrivate: Yup.string().min(1),
    diet: Yup.array().min(2, 'choose at least 2 types'),
    category: Yup.array().min(2, 'choose at least 2 types'),
    prepTimeMin: Yup.string(),
    description: Yup.string().min(3).max(30).required('3'),
    source: Yup.string().min(3, 'min 3 charachters').max(20, 'must be 20 charachters or less')
})
