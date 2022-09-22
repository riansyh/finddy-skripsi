export default {
    variants: {
        outline: {
            field: {
                borderRadius: "4px",
                borderColor: "neutral.20",
                _placeholder: {
                    color: "neutral.20",
                },
                _hover: {
                    borderColor: "neutral.40",
                },
            },
        },
    },
    sizes: {
        md: {
            field: {
                px: "16px",
                h: "52px",
            },
        },
    },
    defaultProps: {
        focusBorderColor: "primary.midblue",
    },
};
