"use client";

import { IoIosSearch } from "react-icons/io";
import styles from "./Search.module.css";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";
import SearchResults from "../cards/SearchResults";
import SkSearchResults from "../skeletons/SkSearchResults";

type User = {
  id: string;
  name: string;
  image: string;
  bio: string;
  username: string;
  locationOfUser: string;
};

const Search = () => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.length > 2) {
        setIsLoading(true);
        const results = await fetchUsers({
          searchString: formData,
          userId: userId || "",
          pageNumber: 1,
          pageSize: 25,
        });
        console.log(results.users[0]);
        
        setSearchResults(results.users);

        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData, userId]);

  return (
    <div>
      <div className={styles.section}>
        <IoIosSearch size="1.8em" className={styles.reactIcons} />
        <input
        className={styles.inputBar}
          type="text"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          placeholder={`Who are you looking for? `}
          autoFocus
        />
      </div>
      <div>
        {searchResults.map((user: User) => (
          <SearchResults
            key={user.id}
            id={user.id}
            image={user.image}
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
