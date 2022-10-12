import dayjs from "dayjs";

export const showMessageTime = (date, message = false) => {
    const nowDate = new Date();
    let result = "";
    if (
        dayjs(nowDate).locale("id-id").format("DD-MM-YY") ==
        dayjs(date).locale("id-id").format("DD-MM-YY")
    ) {
        result = dayjs(date).locale("id-id").format("HH:mm");
    } else {
        result = message
            ? dayjs(date).locale("id-id").format("DD/MM HH:mm")
            : dayjs(date).locale("id-id").format("DD/MM");
    }
    return result;
};
