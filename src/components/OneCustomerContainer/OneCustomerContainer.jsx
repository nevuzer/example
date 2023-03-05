import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Select } from "components/Select/Select";
import { Loader } from "components/Loader/Loader";
import { PurchasesDetailsByCustomerTable } from "components/PurchasesDetailsByCustomerTable/PurchasesDetailsByCustomerTable";
import { AllTransactionOneCustomerTable } from "components/AllTransactionOneCustomerTable/AllTransactionOneCustomerTable";
import { calculateCustomerPurchasesByMonth } from "shared/functions/purchases";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { CustomerService } from "services/customer.service";
import { PurchaseService } from "services/purchase.service";
import styles from "./OneCustomerContainer.module.css";

export const OneCustomerContainer = () => {
  const [customerId, setCustomerId] = useState("");
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const changeCustomer = (e) => {
    const value = e.target.value;
    setCustomerId(value);
    fetchPurchases(value);
  };

  const fetchPurchases = (customerId) => {
    setIsLoadingPurchases(true);
    PurchaseService.fetchPurchasesByCustomerId(customerId)
      .then((response) => {
        setPurchases(response);
        setIsLoadingPurchases(false);
        setIsError(false);
      })
      .catch(() => {
        setIsLoadingPurchases(false);
        setIsError(true);
      });
  };

  const findCustomerNameById = (customId) => {
    const customerObject = customers.find(
      (customer) => customer.id === customId
    );
    return customerObject ? customerObject.name : "";
  };

  useEffect(() => {
    setIsLoadingCustomers(true);
    CustomerService.fetchCustomers()
      .then((response) => {
        setIsLoadingCustomers(false);
        setCustomers(response);
      })
      .catch(() => {
        setIsLoadingCustomers(false);
        setIsError(true);
      });
  }, []);

  return (
    <>
      {!isLoadingCustomers && (
        <Select
          label={"Customer"}
          options={customers.map((customer) => ({
            id: customer.id,
            label: customer.name,
          }))}
          onChange={changeCustomer}
          value={customerId}
          disabled={isLoadingPurchases}
        />
      )}
      <Box className={styles.tableContainer}>
        {(isLoadingPurchases || isLoadingCustomers) && (
          <Loader message="Please wait..." />
        )}
        {!isLoadingPurchases && purchases.length !== 0 && !isError && (
          <>
            <PurchasesDetailsByCustomerTable
              data={[
                {
                  customer: findCustomerNameById(customerId),
                  customerId: customerId,
                  month1: calculateCustomerPurchasesByMonth(purchases, 0),
                  month2: calculateCustomerPurchasesByMonth(purchases, -1),
                  month3: calculateCustomerPurchasesByMonth(purchases, -2),
                },
              ]}
            />
            <AllTransactionOneCustomerTable purchases={purchases} />
          </>
        )}
        {isError && (
          <ErrorMessage message={"Something went wrong, try again"} />
        )}
      </Box>
    </>
  );
};
