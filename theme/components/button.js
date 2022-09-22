export const Button = {
    baseStyle: {
        fontWeight: "bold",
        p: "12px",
        borderRadius: "8px",
        letterSpacing: ".5px",
    },

    sizes: {
        full: {
            w: "100%",
        },
    },

    variants: {
        primary: {
            bg: "primary.calmblue",
            textColor: "#ffffff",
            _hover: {
                bg: "#1074BA",
            },
        },
        secondary: {
            bg: "primary.lightblue",
            textColor: "primary.calmblue",
            _hover: {
                bg: "#D5E9F3",
            },
        },
    },
};
