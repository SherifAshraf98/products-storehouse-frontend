import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "../containers/form/Form";
import { Box } from "@mui/material";
import { Loader } from "../components/loader/Loader";
import TransitionAlert from "../components/alert/TransitionAlert";

export interface Categories {
  id: number;
  name: string;
}

export const Main = () => {
  // state to store the fetched categories in
  const [categories, setCategories] = useState<Categories[]>([]);

  // state to store any error happens while fetching categories
  const [isError, setError] = useState<boolean>(false);

  // fetch categories at first page render
  useEffect(() => {
    axios
      .get("https://products-storehouse-backend.herokuapp.com/api/categories")
      .then((response) => {
        // store categories
        setCategories(
          response.data.data.map((category: any) => ({
            id: category?.id,
            name: category?.attributes.name,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  // in case of any error occurred while fetching data, show error alert
  if (isError) return <TransitionAlert />;

  // while data is not fetched yet, show a loader indicator
  if (!categories.length) return <Loader />;

  return (
    <Box my={4} mx={2}>
      <Form categories={categories} />
    </Box>
  );
};
