export default function validateInfo(values) {
  let errors = {};
  errors.firstName = [];
  errors.lastName = [];
  errors.email = [];
  errors.adress = [];
  errors.password = [];
  errors.password2 = [];
  errors.isPrivate = [];
  errors.image = []
  errors.category = []
  errors.diet = []
  errors.source = []

  if (!values.firstName || !values.firstName.trim()) {
    if (!errors.firstName) errors.firstName = []
    errors.firstName.push("please enter name");
  }
  if (values.firstName && values.firstName.length < 3) {
    if (!errors.firstName) errors.firstName = []
    errors.firstName.push("firstname must be at least 3 characters long");
  }
  if (!values.lastName || !values.lastName.trim()) {
    if (!errors.lastName) errors.lastName = []
    errors.lastName.push("please enter your lastname");
  }
  if (values.lastName && values.lastName.length < 3) {
    if (!errors.lastName) errors.lastName = []
    errors.lastName.push('lastname must be at least 3 characters long')
  }
  
  if (!values.email) {
    if (!errors.email) errors.email = []
    errors.email.push("Please enter your email");
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    if (!errors.email) errors.email = []
    errors.email.push("The email you entered is invalid");
  }
  if (!values.password) {
    if (!errors.password) errors.password = []
    errors.password.push("please enter your password");
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)
  ) {
    if (!errors.email) errors.email = []
    if (!errors.email) errors.email = []
    errors.password.push("The password doesn't match the requirements");
  }

  if (values.password != values.password2) {
    if (!errors.password) errors.password = []
    console.log(values.password2);
    errors.password2.push("Passwords are not identical");
  }

  if (!values.isPrivate) {
    if (!errors.isPrivate) errors.isPrivate = []
    errors.isPrivate.push("please choose");
  }
  // if (!values.image) {
  //   if (!errors.image) errors.image = []
  //   errors.image.push("please choose image");
  // } else if (values.image.length === 0) errors.image.push("please choose image");

  if (values.category.length < 2) {
    if (!errors.category) errors.category = []
    errors.category.push('please choose  at least 2 types')
  }
  if (values.diet.length < 2) {
    if (!errors.diet) errors.diet = []
    errors.diet.push('please choose  at least 2 types')
  }
  if (!values.source) {
    if (!errors.source) errors.source = []
    errors.source.push('please enter the source')
  }

  return errors;
}
