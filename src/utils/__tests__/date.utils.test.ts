import { formatDate } from "@/utils/date.utils";

describe("Date Utils", () => {
    it("formats a date correctly", () => {
        expect(formatDate("2024-01-20")).toBe("Jan 20");
    });
});
