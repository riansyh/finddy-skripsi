import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";
import { colors, fontSizes, fonts, lineHeights } from "./styles";

const overrides = {
    colors,
    fontSizes,
    fonts,
    lineHeights,

    components: {
        Button,
    },
};

export default extendTheme(overrides);
