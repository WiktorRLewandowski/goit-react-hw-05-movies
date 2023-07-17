import { ThreeCircles } from "react-loader-spinner";
import css from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={css.wrapper}>
            <ThreeCircles className={css.loader} color="red"/>
        </div>
    )
}