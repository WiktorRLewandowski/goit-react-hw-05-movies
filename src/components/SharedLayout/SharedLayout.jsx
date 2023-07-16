import { NavLink } from "react-router-dom"
import css from './SharedLayout.module.css'

export default function SharedLayout() {
    return (
    <nav>
      <ul className={css.container}>
        <li><NavLink className={css.btn} to="/">Home</NavLink></li>
        <li><NavLink className={css.btn} to="/movies">Movies</NavLink></li>
      </ul>
    </nav>
    )
}
