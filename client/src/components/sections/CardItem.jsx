import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal1 from "../utills/Modal";

function CardItem(props) {

  return (
    <>
      <li className="cards__item cards__item__link" >
        <Link className="" to={{
          pathname: `${props.path}`, onAdd: { add: `${props.onAdd}` }

        }} >
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              className="cards__item__img img-fluid mx-auto"
              alt="Travel Image"
              src={props.src}
              height="10%"
            />
          </figure>
          <div className="cards__item__info text-left">
            <h5 className="cards__item__text text-left">{props.text}</h5>
            <h5 className="cards__item__text text-left"><i class="fas fa-eye"></i>   {props.views}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
