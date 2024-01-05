"use client";

import { IoIosSearch } from "react-icons/io";
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
        console.log(results);

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

  return (
    <div>
      <div className={styles.section}>
        <IoIosSearch size="1.8em" className={styles.reactIcons} />
        <input
          className={styles.inputBar}
          type="text"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
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
      </div>
    </div>
  );
};

export default Search;
