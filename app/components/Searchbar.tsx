"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { log } from "console";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;

    if (
      hostName.includes("amazon.com") ||
      hostName.includes("amazon.") ||
      hostName.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [SearchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(SearchPrompt);
    setSearchPrompt("");
    if (!isValidLink) return alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);
      //scrap the product
      const product = await scrapeAndStoreProduct(SearchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    /* alert(isValidLink ? "Valid Link" : "not Valid Link"); */
  };

  return (
    <form className=" flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Product Link"
        className="searchbar-input"
        value={SearchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={SearchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
export default Searchbar;
