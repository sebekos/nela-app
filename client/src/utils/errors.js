import { toast } from "react-toastify";

export const errorHandler = (graphQLErrors, networkError) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => toast.error(message));
    }
    if (networkError) {
        toast.error(`[Network error]: ${networkError}`);
    }
};
