import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Loader } from "components/Loader/Loader";
import { PurchasesDetailsByCustomerTable } from "components/PurchasesDetailsByCustomerTable/PurchasesDetailsByCustomerTable";
import { getPurchasesSortedByCustomerId } from "shared/functions/purchases";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { CustomerService } from "services/customer.service";
import { PurchaseService } from "services/purchase.service";
import styles from "./AllCustomersContainer.module.css";

export const AllCustomersContainer = (props) => {
  const { withError } = props;
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchCustomersAndPurchases = () => {
    setIsLoading(true);
    setIsError(false);
    setPurchases([]);
    setCustomers([]);
    const fetchData = withError
      ? PurchaseService.fetchPurchasesWithWrongEndpoint
      : PurchaseService.fetchPurchases;
    Promise.all([CustomerService.fetchCustomers(), fetchData()])
      .then((values) => {
        setCustomers(values[0]);
        setPurchases(values[1]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={fetchCustomersAndPurchases}
        disabled={isLoading}
      >
        Fetch data
      </Button>
      <Box className={styles.container}>
        {isLoading && <Loader message="Please wait..." />}
        {purchases.length !== 0 && customers.length !== 0 && !isError && (
          <PurchasesDetailsByCustomerTable
            data={getPurchasesSortedByCustomerId(customers, purchases)}
          />
        )}
        {isError && (
          <ErrorMessage message={"Something went wrong, try again"} />
        )}
      </Box>
    </>
  );
};
