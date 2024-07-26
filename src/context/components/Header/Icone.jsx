import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
const Icone = () => {
    return (
        <Link to={'/profile'} className="profile-icon">
            <MdOutlineAccountCircle size={30}/>
        </Link>
    );
}

export default Icone;
