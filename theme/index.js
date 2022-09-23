import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";
import Input from "./components/input";
import { colors, fontSizes, fonts, lineHeights, shadows } from "./styles";

const overrides = {
    colors,
    fontSizes,
    fonts,
    lineHeights,
    shadows,

    components: {
        Button,
        Input,
    },
};

export default extendTheme(overrides);
