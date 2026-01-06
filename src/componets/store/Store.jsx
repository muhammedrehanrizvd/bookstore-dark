import React, { useState,useMemo } from "react";
import Head from "./Head";
import StoreData from "../../data/StoreData";
import CardStore from "./CardStore";
import { motion, AnimatePresence } from "framer-motion";


function Store() {
  const [storeType, setStoreType] = useState("offline");

  const filteredStores = useMemo(() => {
  return StoreData.filter(store => store.type === storeType);
}, [storeType, StoreData]);

  const featuredStores = StoreData.filter(
  (store) => store.isFeatured === true
);


  return (
    <div>
      <Head storeType={storeType} setStoreType={setStoreType} />
      


      <AnimatePresence mode="wait">
        <motion.div
          key={storeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 my-3 md:mb-6"
        >
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <CardStore
                key={store.id}
                name={store.name}
                address={store.address}
                type={store.type}
                link={store.link}
                rating={store.rating}
                contact={store.contact}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 text-xl">
              😕 No {storeType} stores available right now.
            </div>
          )}

          
        </motion.div>
      </AnimatePresence>
      {/* ⭐ Featured Stores Section */}
      {featuredStores.length > 0 && (
        <div className="px-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🌟 Featured Stores
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredStores.map((store) => (
              <CardStore
                key={store.id}
                name={store.name}
                address={store.address}
                type={store.type}
                link={store.link}
                className={'border-2 border-yellow-400 mb-3 shadow-yellow-200/50'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
