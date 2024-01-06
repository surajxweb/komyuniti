"use client";

import { MdOutlineSearch } from "react-icons/md";
import styles from "./Search.module.css";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";
import SearchResults from "../cards/SearchResults";
import SkSearchResults from "../skeletons/SkSearchResults";
import { fetchCommunities } from "@/lib/actions/community.actions";

const Search = ({ type }: { type?: string }) => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nobodyFound, setNobodyFound] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.length > 2) {
        setIsLoading(true);
        const results =
          type === "community"
            ? await fetchCommunities({
                searchString: formData,
                pageNumber: 1,
                pageSize: 25,
              })
            : await fetchUsers({
                searchString: formData,
                userId: userId || "",
                pageNumber: 1,
                pageSize: 25,
              });
        setNobodyFound(
          type === "community"
            ? (results as { communities: any[]; isNext: boolean }).communities
                .length === 0
            : (results as { users: any[]; isNext: boolean }).users.length === 0
        );
        setSearchResults(
          type === "community"
            ? (results as { communities: any[]; isNext: boolean }).communities
            : (results as { users: any[]; isNext: boolean }).users
        );

        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [formData, type, userId]);

  const inputChangeHandeller = (e: any) => {
    setNobodyFound(false);
    setFormData(e.target.value);
  };

  return (
    <div>
      <div className={styles.search}>
        <MdOutlineSearch size="1.8em" className={styles.reactIcons} />
        <input
          className={styles.inputBar}
          type="text"
          value={formData}
          onChange={inputChangeHandeller}
          placeholder={
            type === "community"
              ? `Enter name of the community.`
              : `Who are you looking for? `
          }
          autoFocus
        />
      </div>
      <div>
        {searchResults.map((user: any) => (
          <SearchResults
            key={user.id}
            type={type}
            id={user._id.toString()}
            image={user.image || user.header_image}
            bio={user.bio}
            name={user.name}
            username={user.username}
            location={user.locationOfUser}
          />
        ))}
        {isLoading && <SkSearchResults />}
        {nobodyFound && (
          <div>{`Nobody with the name/username "${formData}" found on Komyuniti.`}</div>
        )}
      </div>
      <div>{/* <h2>Search History </h2> */}</div>
    </div>
  );
};

export default Search;
