import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({ focused = true, name, color = styles.darkGreyColor, size = 26 }) => (
    <Ionicons name={name} color={focused ? styles.navyColor : color} size={size} />
);

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

export default NavIcon;