import {GoogleAutoCompletePrediction, GoogleBusiness, YelpBusiness} from "../types";
import React, {createRef, useMemo, useState} from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {getLatLong, getLocationAutoComplete} from "../service/googleMapService";
import debounce from "lodash.debounce";
import {Button, FormControl, InputGroup} from "react-bootstrap";

interface SearchBarProps {
  handleSearchResults: (a: Map<string, Array<YelpBusiness|GoogleBusiness>>) => void;
  callYelpAndGoogle: () => void;
  latLong: Array<string>;
  searchAreaTerm: Array<string>;
  searchBoxTerm: string;
  setLatLongValues: (a: Array<string>) => void;
  setSearchAreaValues: (a: Array<string>) => void;
  setSearchTermValues: (a: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [options, setCityOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const selectLocationDropdown = createRef<AsyncTypeahead<string>>();

  const changeHandler = (locationText: string) => {
    setLoading(true);
    getLocationAutoComplete(locationText).then((res) => {
      const formattedData = res.predictions
        .map((val: GoogleAutoCompletePrediction) => val.description);
      setCityOptions(formattedData);
    })
      .finally(() => setLoading(false));
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  const handleMenuClose = (menuOpen: boolean) => {
    const selectedVal = selectLocationDropdown.current?.getInput().value;

    if (!menuOpen && selectedVal) {
      props.setSearchAreaValues([selectedVal || props.searchAreaTerm[0]]);
      getLatLong(selectedVal).then((res) => {
        const { lng, lat } = res.results[0].geometry.location;
        props.setLatLongValues([lng, lat]);
      });
    }
  }

  //TODO(miketran): Validation of inputs.
  /**
   * Kicks off search when both inputs are inputted.
   * @param evt
   */
  const handleSearch = (evt: any) => {
    evt.preventDefault();
    props.callYelpAndGoogle()
  }

  const clearLocationInput = () => {
    selectLocationDropdown.current?.clear();
  }

  // KeyboardEvent<FormControlElement> was throwing an error
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Find:</InputGroup.Text>
      <FormControl
        placeholder="Find..."
        aria-label="Find what?"
        as={"input"}
        aria-describedby="basic-addon2"
        type={"text"}
        value={props.searchBoxTerm}
        onKeyDown={handleKeyDown}
        onChange={(evt) => props.setSearchTermValues(evt.target.value)}
      />
      <InputGroup.Text>Nearby:</InputGroup.Text>
      <AsyncTypeahead
        defaultSelected={props.searchAreaTerm}
        id="selections-example"
        onSearch={(text: string) => { debouncedChangeHandler(text); }}
        options={options}
        ref={selectLocationDropdown}
        placeholder="Choose a city..."
        isLoading={isLoading}
        onMenuToggle={handleMenuClose}
        onFocus={clearLocationInput}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearch}>Search
      </Button>
    </InputGroup>
  );
}
