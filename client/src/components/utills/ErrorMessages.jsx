function ErrorMessages(props) {
  return props.errors.map((error, index) => (
    <li key={index} id="emailHelp" className="form-text text-danger">
      {error}
    </li>
  ));
}

export default ErrorMessages;
