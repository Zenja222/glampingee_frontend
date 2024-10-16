import axios from "axios";
//done
export const showAllAvailableBooking = async () => {
    const response = (await axios.get(``));
    return response.data
}