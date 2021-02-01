import React from "react";
import styles from "./user.module.css"


    const UserCard = (props) => {
        
        return (
        <div className={styles.contact}>
            <img className={styles.avatar} 
            src={props.avatar ? props.avatar : ''} 
            alt={props.name}
            onClick={props.SelectedUser}
            />
            <div>
            <p className={styles.name}>{props.name}</p>
            <span className={props.isOnline === 'Y' ? `${styles.online} `: `${styles.offline}`}></span>
            </div>
        </div>
        );
    
    }


export default UserCard;