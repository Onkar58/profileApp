import React from 'react'
import classes from './Suggestions.module.css'
import img from '../../assets/Avatar.png'

const Suggestions = () => {
    const tags = ["onkar", "ui", "ux", "developer", "software", "web", "programmer"]
    return (
        <div className={classes.main}>
            <h3>People You May Know</h3>
            <div className={classes.people}>
                <div className={classes.person}>
                    <img src={img} alt='' />
                    <div className={classes.info}>
                        <h3>Komal Bagalkar</h3>
                        <h5>komu2606b</h5>
                        <div className={classes.tags}>
                            {tags.map((current) => "#" + current + ", ")}
                        </div>
                    </div>
                    <h2>Connect</h2>
                </div>
                <div className={classes.person}>
                    <img src={img} alt='' />
                    <div className={classes.info}>
                        <h3>Komal Bagalkar</h3>
                        <h5>komu2606b</h5>
                        <div className={classes.tags}>
                            {tags.map((current) => "#" + current + ", ")}
                        </div>
                    </div>
                    <h2>Connect</h2>
                </div>
            </div>
            <button className={classes.btn}>Close</button>
        </div>
    )
}

export default Suggestions