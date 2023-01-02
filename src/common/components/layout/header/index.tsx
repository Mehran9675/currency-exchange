import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import ROUTES from "../../../routes.enum";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const push = useNavigate();
  const handleTabChange = (e: SyntheticEvent, tabValue: ROUTES) =>
    push(tabValue);

  return (
    <header className={styles.header}>
      <div>
        <h1>
          Currency<b>Exchange</b>
        </h1>
        <Tabs value={location.pathname} onChange={handleTabChange}>
          <Tab value={ROUTES.HOME} label="CURRENCY CONVERTER" />
          <Tab value={ROUTES.HISTORY} label="VIEW CONVERSION HISTORY" />
        </Tabs>
      </div>
    </header>
  );
};
export default Header;
