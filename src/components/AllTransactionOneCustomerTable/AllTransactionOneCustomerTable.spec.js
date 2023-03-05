import { render, screen } from "@testing-library/react";
import { AllTransactionOneCustomerTable } from "./AllTransactionOneCustomerTable";

const purchases = [
  { id: 0, date: "2023-03-03T20:23:44+01:00", userId: 1, price: 172.1 },
  {
    id: 1,
    date: "2023-03-03T17:23:44+01:00",
    userId: 1,
    price: 277.23,
  },
  { id: 2, date: "2023-03-03T09:23:44+01:00", userId: 1, price: 81.49 },
  {
    id: 3,
    date: "2023-03-03T01:23:44+01:00",
    userId: 1,
    price: 181.32,
  },
  {
    id: 4,
    date: "2023-03-03T00:23:44+01:00",
    userId: 1,
    price: 147.61,
  },
  {
    id: 5,
    date: "2023-03-02T16:23:44+01:00",
    userId: 1,
    price: 166.83,
  },
  { id: 6, date: "2023-03-02T13:23:44+01:00", userId: 1, price: 23.33 },
  { id: 7, date: "2023-03-02T11:23:44+01:00", userId: 1, price: 83.01 },
  {
    id: 8,
    date: "2023-03-02T10:23:44+01:00",
    userId: 1,
    price: 226.21,
  },
  {
    id: 9,
    date: "2023-03-02T09:23:44+01:00",
    userId: 1,
    price: 177.85,
  },
  {
    id: 10,
    date: "2023-03-02T02:23:44+01:00",
    userId: 1,
    price: 139.36,
  },
];

describe("AllTransactionOneCustomerTable", () => {
  it("Column headers should be visible", () => {
    render(<AllTransactionOneCustomerTable purchases={purchases} />);

    expect(screen.getByText("Date")).toBeVisible();
    expect(screen.getByText("Price")).toBeVisible();
    expect(screen.getByText("Points")).toBeVisible();
  });

  it("Table should contain 11 rows", () => {
    render(<AllTransactionOneCustomerTable purchases={purchases} />);

    expect(screen.getAllByRole("table-body-tr")).toHaveLength(11);
  });
});
