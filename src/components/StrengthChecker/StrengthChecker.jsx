import { useEffect, useState } from "react";

const StrengthChecker = ({ password }) => {

    const [strength, setStrength] = useState(0);

    const checkPassword = (password) => {
        var strength1 = 0;
        if (/[A-Z]/.test(password)) {
            strength1++;
        }
        if (/[a-z]/.test(password)) {
            strength1++;
        }
        if (/[0-9]/.test(password)) {
            strength1++;
        }
        if (/[@#_-]/.test(password)) {
            strength1++;
        }
        if (password.length >= 8) {
            strength1++;
        }
        setStrength(strength1);
    };
    useEffect(() => {
        if (password !== "")
            checkPassword(password);
    }, [password]);
    return (
        <div>
            Password is {""}
            {strength < 3 ? (
                <p style={{ color: "#f00", display: "inline" }}>Weak</p>
            ) : strength < 5 ? (
                <p style={{ color: "#f70", display: "inline" }}>Moderate</p>
            ) : strength === 5 ? (
                <p style={{ color: "#0f0", display: "inline" }}>Strong</p>
            ) : (
                ""
            )}
        </div>
    );
};

export default StrengthChecker;
