import React from "react";
import styles from "./user.module.css"


    const UserCard = (props) => {
        
        return (
        <div className={styles.contact}>
            <img className={styles.avatar} 
            src={props.avatar ? props.avatar : `https://dmo-pro.com/include/FileManager/userfiles//agences/3be3c8ed627c056f3d6aa05c2f943bd8//img/team/steph-n1.jpg`} 
            alt={props.firstName}
            onClick={props.SelectedUser}
            />
            <div style={{width:"30px"}}>
            <p className={styles.name}>{props.firstName}</p>
            <span className={props.isOnline === 'Y' ? `${styles.online} `: `${styles.offline}`}></span>
            </div>
        </div>
        );
    
    }


export default UserCard;