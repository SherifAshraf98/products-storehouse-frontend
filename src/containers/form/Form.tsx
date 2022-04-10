import { Categories } from "../../main/Main";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import * as React from "react";
import ShowPage from "../show-page/ShowPage";
import TransitionAlert from "../../components/alert/TransitionAlert";

interface FormProps {
  categories: Categories[];
}

interface Products {
  id: number;
  name: string;
  price: number;
}

export const Form = (props: FormProps) => {
  const { categories } = props;

  // state containing the category id selected from the first select input
  const [category, setCategory] = useState<number>(0);

  // state to store the fetched products in
  const [products, setProducts] = useState<Products[]>([]);

  // state to store any error happens while fetching categories
  const [isError, setError] = useState<boolean>(false);

  // state to control the appearance of the dialog (show page)
  const [openShowPage, setOpenShowPage] = React.useState<boolean>(false);

  // fetch products when the user selects a certain category
  useEffect(() => {
    axios
      .get(
        `https://products-storehouse-backend.herokuapp.com/api/products?fields=id,name,price&filters[category][id][$eq]=${category}&populate=category`
      )
      .then((response) => {
        // store products
        setProducts(
          response.data.data.map((product: any) => ({
            id: product?.id,
            name: product?.attributes.name,
            price: product?.attributes.price,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [category]);

  // define validation schema using YUP, to use it on form submit
  const validationSchema = yup.object({
    category: yup.number().required("Please select category"),
    product: yup.number().required("Please select product"),
  });

  // in case of any error occurred while fetching data, show error alert
  if (isError) return <TransitionAlert />;

  return (
    <Box>
      <Typography variant={"h3"} mb={8}>
        INVENTORY
      </Typography>
      <Formik
        initialValues={{ category: "", product: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // show dialog (open page)
          setOpenShowPage(true);
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setTouched,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gridTemplateColumns={"1fr"}
              width="100%"
              justifyItems={"center"}
              rowGap={8}
            >
              <Box width={"70%"}>
                <FormControl fullWidth>
                  <InputLabel
                    id="categories-select-label"
                    style={{ backgroundColor: "white" }}
                  >
                    Categories
                  </InputLabel>
                  <Select
                    key={"categories-select"}
                    labelId="categories-select-label"
                    id="categories-select"
                    name={"category"}
                    value={values.category}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("product", "");
                      setProducts([]);
                      setCategory(e.target.value ? +e.target.value : 0);
                      setTouched({ ...touched, product: true });
                    }}
                    onBlur={handleBlur}
                    input={<OutlinedInput label="Name" />}
                    error={touched.category && Boolean(errors.category)}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={`category-${category.id}`}
                        value={category.id}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && Boolean(errors.category) && (
                    <FormHelperText
                      error={touched.category && Boolean(errors.category)}
                    >
                      {touched.category && errors.category}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box width={"70%"}>
                <FormControl fullWidth>
                  <InputLabel
                    id="products-select-label"
                    style={{ backgroundColor: "white" }}
                  >
                    Products
                  </InputLabel>
                  <Select
                    labelId="products-select-label"
                    id="products-select"
                    name={"product"}
                    value={values.product}
                    disabled={!values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    input={<OutlinedInput label="Name" />}
                    error={touched.product && Boolean(errors.product)}
                  >
                    {products.map((product) => (
                      <MenuItem
                        key={`product-${product.id}`}
                        value={product.id}
                      >
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.product && Boolean(errors.product) && (
                    <FormHelperText
                      error={touched.product && Boolean(errors.product)}
                    >
                      {errors.product}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button
                type={"submit"}
                disabled={isSubmitting}
                variant={"outlined"}
                size={"large"}
              >
                Submit
              </Button>
              <ShowPage
                product={products.filter((p) => p.id === +values.product)[0]}
                category={
                  categories.filter((c) => c.id === +values.category)[0]
                }
                open={openShowPage}
                setOpen={setOpenShowPage}
                resetForm={resetForm}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
