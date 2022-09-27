export const Button = {
    baseStyle: {
        fontWeight: "bold",
        px: "12px",
        py: "12px",
        borderRadius: "8px",
        letterSpacing: ".5px",
    },

    sizes: {
        full: {
            w: "100%",
            h: "46px",
        },
        md: {
            h: "46px",
        },
    },

    variants: {
        primary: {
            bg: "primary.calmblue",
            textColor: "#ffffff",
            _hover: {
                bg: "#1074BA",
                _disabled: {
                    bg: "#1074BA",
                },
            },
        },
        secondary: {
            bg: "primary.lightblue",
            textColor: "primary.calmblue",
            _hover: {
                bg: "#D5E9F3",
                _disabled: {
                    bg: "#D5E9F3",
                },
            },
        },
    },
};
