import axios, { AxiosResponse } from "axios";
import classes from "./NewPoodle.module.css";
import React, { useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Button } from "react-bootstrap";
import useGetSizes from "../hooks/getSizesHook";
import useGetColors from "../hooks/getColorsHook";

const NewPoodle: React.FC = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const poodleNameRef = useRef<HTMLInputElement>(null);
  const poodleDateRef = useRef<HTMLInputElement>(null);
  const poodlePedigreeNumberRef = useRef<HTMLInputElement>(null);

  const { selectSizeOption, setSelectedSizeOption, sizes } = useGetSizes();

  const { selectColorOption, setSelectedColorOption, colors } = useGetColors();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredPoodleName = poodleNameRef.current!.value;
    const enteredPoodleDate = poodleDateRef.current!.value;
    const enteredPedigreeNumber = poodlePedigreeNumberRef.current!.value;

    const addPoodle = async () => {
      await axios
        .post<AxiosResponse>(
          "https://localhost:44373/api/poodles",
          {
            name: enteredPoodleName,
            dateOfBirth: enteredPoodleDate,
            geneticTests: true,
            image: "test123",
            pedigreeNumber: enteredPedigreeNumber,
            poodleSizeId: selectSizeOption,
            poodleColorId: selectColorOption,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          console.log(response.data);

          alert("added to DB");
        })
        .catch((error: string) => {
          alert(error);
        });
    };
    addPoodle();
  };

  // const geneticTestHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setStatus(e.target.value);
  // };

  const changeSelectSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSizeOption(parseInt(e.target.value));
  };

  const changeSelectColorHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedColorOption(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Add new poodle do the database</h1>
      <section className={classes.auth}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="poodleName">Name</label>
            <input type="text" id="poodleName" required ref={poodleNameRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="poodleDate">Date of birth</label>
            <input type="date" id="poodleDate" required ref={poodleDateRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="geneticTest">Genetic test</label>
            <select id="geneticTest" name="geneticTest">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="poodlePedigree">Number of pedigree</label>
            <input
              type="text"
              id="poodlePedigree"
              required
              ref={poodlePedigreeNumberRef}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="sizeName">Select size of poodle</label>
            <select
              id="sizeName"
              name="sizeName"
              value={selectSizeOption}
              onChange={changeSelectSizeHandler}
            >
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="colorName">Select color of poodle</label>
            <select
              id="colorName"
              name="colorName"
              value={selectColorOption}
              onChange={changeSelectColorHandler}
            >
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-12 text-center">
            <Button type="submit" variant="outline-dark">
              Add
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewPoodle;
