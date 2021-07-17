import { Form, InputGroup, Button, Col } from "react-bootstrap";

function InputCreator(props) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Form.Label className="d-block ">{props.title}</Form.Label>
        <div className="input-width">
          <Form.Control
            as={props.as}
            type={props.type}
            defaultValue={props.value}
            onChange={props.handleInputChange}
            name={props.name}
            placeholder={props.placeholder}
            required={!!props.required}
            onChange={props.onChange}
            onBlur={props.onBlur}
            name={props.name}
            error={props.error}
            className={props.error ? "red-input" : null}
          />
          <small className="text-right">{props.note}</small>
        </div>
      </div>
    </>
  );
}
export default InputCreator;
