import React from 'react'
import classes from './Pizzaimage.css'
import PizzaImg from '../../assets/pizza.jpg'
const pizzaImage = props => (
    <div className={classes.PizzaImage}>
        <img src={PizzaImg} className={classes.PizzaImage} alt=""/>
    </div>
)

export default pizzaImage