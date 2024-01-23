export const formatDate = (inputDate: string): string => {
    const dateObject = new Date(inputDate);

    const options: Intl.DateTimeFormatOptions = {
        month: "short" as const, // explicitly cast 'short' to const string
        day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateObject);
};
