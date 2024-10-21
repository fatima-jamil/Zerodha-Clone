import React, { useState } from "react";
import { BuyActionWindow, SellActionWindow } from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid, price) => {},

  closeBuyWindow: () => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockPrice, setSelectedStockPrice] = useState(0); // Store stock price

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid, price) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price); // Store price in state
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0); // Reset the price
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,

        closeBuyWindow: handleCloseBuyWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} price={selectedStockPrice} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
