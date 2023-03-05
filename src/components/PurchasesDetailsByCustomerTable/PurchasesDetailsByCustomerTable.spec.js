import { render, screen, within } from "@testing-library/react";
import { PurchasesDetailsByCustomerTable } from "./PurchasesDetailsByCustomerTable";
import { format, subMonths } from "date-fns";

const data = [
  {
    customer: "Mariola Wisienka",
    customerId: 1,
    month1: {
      sum: 325,
      points: 350,
      transactions: 2,
    },
    month2: {
      sum: 0,
      points: 0,
      transactions: 0,
    },
    month3: {
      sum: 0,
      points: 0,
      transactions: 0,
    },
  },
];

const getMonthName = (months) =>
  format(subMonths(new Date(), months || 0), "MMMM");

describe("PurchasesDetailsByCustomerTable", () => {
  it("Column headers should be visible", () => {
    render(<PurchasesDetailsByCustomerTable data={data} />);

    expect(screen.getByText("Customer")).toBeVisible();
    expect(screen.getByText("All")).toBeVisible();
    expect(screen.getByText(getMonthName())).toBeVisible();
    expect(screen.getByText(getMonthName(1))).toBeVisible();
    expect(screen.getByText(getMonthName(2))).toBeVisible();
  });

  it("Mariola Wisienka should be the customer", () => {
    render(<PurchasesDetailsByCustomerTable data={data} />);

    expect(screen.getByText("Mariola Wisienka")).toBeVisible();
  });

  it("Each month should contain: Transactions, Sum and Points", () => {
    render(<PurchasesDetailsByCustomerTable data={data} />);

    screen.getAllByRole("month-data-cell").forEach((monthCell) => {
      expect(monthCell).toHaveTextContent("Transactions");
      expect(monthCell).toHaveTextContent("Sum");
      expect(monthCell).toHaveTextContent("Points");
    });
  });

  it("The first column with month should contain correct data", () => {
    render(<PurchasesDetailsByCustomerTable data={data} />);

    expect(
      within(screen.getAllByRole("month-data-cell")[0]).getByRole(
        "transactions-value"
      )
    ).toHaveTextContent("2");
    expect(
      within(screen.getAllByRole("month-data-cell")[0]).getByRole(
        "points-value"
      )
    ).toHaveTextContent("350");
    expect(
      within(screen.getAllByRole("month-data-cell")[0]).getByRole("sum-value")
    ).toHaveTextContent("325");
  });
});
